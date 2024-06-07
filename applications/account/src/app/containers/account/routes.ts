import { c } from 'ttag';

import { ThemeColor } from '@proton/colors';
import { SectionConfig } from '@proton/components';
import {
    APPS,
    APP_NAMES,
    BRAND_NAME,
    DARK_WEB_MONITORING_NAME,
    DEFAULT_CURRENCY,
    PRODUCT_NAMES,
    PROTON_SENTINEL_NAME,
    REFERRAL_PROGRAM_MAX_AMOUNT,
} from '@proton/shared/lib/constants';
import { humanPriceWithCurrency } from '@proton/shared/lib/helpers/humanPrice';
import {
    getHasVpnB2BPlan,
    getHasVpnOrPassB2BPlan,
    hasCancellablePlan,
    hasNewCancellablePlan,
} from '@proton/shared/lib/helpers/subscription';
import { Address, Organization, Renew, Subscription, UserModel, UserType } from '@proton/shared/lib/interfaces';
import { getIsExternalAccount, getIsSSOVPNOnlyAccount } from '@proton/shared/lib/keys';
import { isOrganizationFamily, isOrganizationVisionary } from '@proton/shared/lib/organization/helper';
import { getHasStorageSplit } from '@proton/shared/lib/user/storage';

import { recoveryIds } from './recoveryIds';

export const getAccountAppRoutes = ({
    app,
    user,
    subscription,
    isDataRecoveryAvailable,
    isSessionRecoveryAvailable,
    isReferralProgramEnabled,
    recoveryNotification,
    organization,
    isBreachesAccountDashboardEnabled,
    showThemeSelection,
    isNewCancellationFlowExtended,
    assistantKillSwitch,
}: {
    app: APP_NAMES;
    user: UserModel;
    addresses?: Address[];
    subscription?: Subscription;
    isDataRecoveryAvailable: boolean;
    isSessionRecoveryAvailable: boolean;
    isReferralProgramEnabled: boolean;
    recoveryNotification?: ThemeColor;
    organization?: Organization;
    isBreachesAccountDashboardEnabled: boolean;
    showThemeSelection: boolean;
    isNewCancellationFlowExtended: boolean;
    assistantKillSwitch: boolean;
}) => {
    const { isFree, canPay, isPaid, isPrivate, isMember, isAdmin, Currency, Type } = user;
    const credits = humanPriceWithCurrency(REFERRAL_PROGRAM_MAX_AMOUNT, Currency || DEFAULT_CURRENCY);

    //Used to determine if a user is on a family plan
    const isFamilyPlan = !!organization && isOrganizationFamily(organization);
    const isFamilyPlanMember = isFamilyPlan && isMember && isPaid;

    //Used to determine if a user is on a visionary plan (works for both old and new visionary plans)
    const isVisionaryPlan = !!organization && isOrganizationVisionary(organization);
    const isMemberProton = Type === UserType.PROTON;

    const hasVPNOrPassB2BPlan = getHasVpnOrPassB2BPlan(subscription);

    // This condition is temporary and required to control the launch of the feature. Will be merged with the condition below once the feature is fully launched.
    const canCancelNewPlan = isNewCancellationFlowExtended && hasNewCancellablePlan(subscription);
    const cancellablePlan = canCancelNewPlan || hasCancellablePlan(subscription);

    const isSSOUser = getIsSSOVPNOnlyAccount(user);
    const hasSplitStorage =
        getHasStorageSplit(user) && !getHasVpnB2BPlan(subscription) && app !== APPS.PROTONVPN_SETTINGS;

    const showEasySwitchSection = !getIsExternalAccount(user) && app !== APPS.PROTONPASS && !isSSOUser;

    return <const>{
        available: true,
        header: c('Settings section title').t`Account`,
        routes: {
            dashboard: <SectionConfig>{
                text: c('Title').t`Dashboard`,
                to: '/dashboard',
                icon: 'squares-in-square',
                available: isFree || canPay || !isMember || (isPaid && canPay),
                subsections: [
                    {
                        text: hasSplitStorage ? c('Title').t`Your storage` : undefined,
                        id: 'your-storage',
                        available: hasSplitStorage,
                    },
                    {
                        text: hasSplitStorage ? c('Title').t`Your plan` : undefined,
                        id: 'your-plan',
                        available: canPay,
                    },
                    {
                        id: 'assistant-toggle',
                        available: !assistantKillSwitch,
                    },
                    {
                        text: c('Title').t`Your subscriptions`,
                        id: 'your-subscriptions',
                        available: isPaid && canPay,
                    },
                    {
                        text: c('Title').t`Payment methods`,
                        id: 'payment-methods',
                        available: canPay,
                    },
                    {
                        text: c('Title').t`Credits`,
                        id: 'credits',
                        available: canPay,
                    },
                    {
                        text: c('Title').t`Gift code`,
                        id: 'gift-code',
                        available: canPay,
                    },
                    {
                        text: c('Title').t`Invoices`,
                        id: 'invoices',
                        available: canPay,
                    },
                    {
                        text: c('Title').t`Email subscriptions`,
                        id: 'email-subscription',
                        available: !isMember,
                    },
                    {
                        text: c('Title').t`Cancel subscription`,
                        id: 'cancel-subscription',
                        available: isPaid && canPay && cancellablePlan && subscription?.Renew === Renew.Enabled,
                    },
                    {
                        text: c('Title').t`Cancel subscription`,
                        id: 'cancel-b2b-subscription',
                        // B2B cancellation has a different flow, so we don't consider it a classic cancellable plan
                        available: isPaid && canPay && !cancellablePlan && hasVPNOrPassB2BPlan,
                    },
                    {
                        text: c('Title').t`Cancel subscription`,
                        id: 'downgrade-account',
                        available: isPaid && canPay && !cancellablePlan && !hasVPNOrPassB2BPlan,
                    },
                ],
            },
            upgrade: <SectionConfig>{
                text: c('Title').t`Upgrade plan`,
                to: '/upgrade',
                icon: 'arrow-up-big-line',
                available: canPay && isFree,
                subsections: [
                    {
                        text: '',
                        id: 'upgrade',
                    },
                ],
            },
            recovery: <SectionConfig>{
                text: c('Title').t`Recovery`,
                to: '/recovery',
                icon: 'key',
                available: isPrivate && !isSSOUser,
                notification: recoveryNotification,
                subsections: [
                    {
                        text: '',
                        id: 'checklist',
                    },
                    {
                        text: c('Title').t`Account recovery`,
                        id: recoveryIds.account,
                    },
                    {
                        text: c('Title').t`Data recovery`,
                        id: recoveryIds.data,
                        available: isDataRecoveryAvailable,
                    },
                    {
                        text: c('Title').t`Password reset settings`,
                        id: 'password-reset',
                        available: isSessionRecoveryAvailable,
                    },
                ],
            },
            password: <SectionConfig>{
                text: c('Title').t`Account and password`,
                to: '/account-password',
                icon: 'user',
                available: !isSSOUser,
                subsections: [
                    {
                        text: '',
                        id: 'account',
                    },
                    {
                        text: c('Title').t`Two-factor authentication`,
                        id: 'two-fa',
                    },
                    {
                        text: isFamilyPlan
                            ? c('familyOffer_2023:Title').t`Family plan`
                            : c('familyOffer_2023: Title').t`Your account's benefits`,
                        id: 'family-plan',
                        // We don't want admin to leave the organization, they need first to be demoted
                        available: !isAdmin && (isFamilyPlan || (isVisionaryPlan && isMemberProton)),
                    },
                    //Family members or Proton account that are part of Visionary don't have access to the dashboard, display the payment methods for them here
                    {
                        text: c('Title').t`Payment methods`,
                        id: 'payment-methods',
                        available: isFamilyPlanMember || (isVisionaryPlan && isMemberProton),
                    },
                    //Family members or Proton account that are part of Visionary don't have access to the dashboard, display the credits for them here
                    {
                        text: c('Title').t`Credits`,
                        id: 'credits',
                        available: isFamilyPlanMember || (isVisionaryPlan && isMemberProton),
                    },
                    //Family members or Proton account that are part of Visionary don't have access to the dashboard, display the invoices for them here
                    {
                        text: c('Title').t`Invoices`,
                        id: 'invoices',
                        available: isFamilyPlanMember || (isVisionaryPlan && isMemberProton),
                    },
                    {
                        text: c('Title').t`Delete account`,
                        id: 'delete',
                        available: user.Type === UserType.PROTON || user.Type === UserType.EXTERNAL,
                    },
                ],
            },
            language: <SectionConfig>{
                text: c('Title').t`Language and time`,
                to: '/language-time',
                icon: 'language',
                subsections: [
                    {
                        id: 'language-time',
                    },
                ],
            },
            appearance: <SectionConfig>{
                text: c('Title').t`Appearance`,
                to: '/appearance',
                icon: 'paint-roller',
                subsections: [
                    {
                        text: c('Title').t`Theme`,
                        id: 'theme',
                        available: showThemeSelection,
                    },
                    {
                        text: c('Title').t`Accessibility`,
                        id: 'accessibility',
                    },
                ],
            },
            security: <SectionConfig>{
                text: c('Title').t`Security and privacy`,
                to: '/security',
                icon: 'shield',
                subsections: [
                    {
                        text: PROTON_SENTINEL_NAME,
                        id: 'sentinel',
                        available: !isSSOUser,
                    },

                    {
                        text: DARK_WEB_MONITORING_NAME,
                        id: 'breaches',
                        available: isBreachesAccountDashboardEnabled && !isSSOUser,
                    },
                    {
                        text: c('Title').t`Session management`,
                        id: 'sessions',
                        available: !isSSOUser,
                    },
                    {
                        text: c('Title').t`Security logs`,
                        id: 'logs',
                        available: !isSSOUser,
                    },
                    {
                        text: c('Title').t`Privacy and data collection`,
                        id: 'privacy',
                    },
                ],
            },
            referral: <SectionConfig>{
                text: c('Title').t`Refer a friend`,
                description: c('Description').t`Get up to ${credits} in credits by inviting friends to ${BRAND_NAME}.`,
                to: '/referral',
                icon: 'heart',
                available: !!isReferralProgramEnabled,
                subsections: [
                    {
                        id: 'referral-invite-section',
                    },
                    {
                        text: c('Title').t`Track your referrals`,
                        id: 'referral-reward-section',
                    },
                ],
            },
            easySwitch: <SectionConfig>{
                text: c('Title').t`Import via ${PRODUCT_NAMES.EASY_SWITCH}`,
                to: '/easy-switch',
                icon: 'arrow-down-to-square',
                available: showEasySwitchSection,
                description: c('Settings description')
                    .t`Complete the transition to privacy with our secure importing and forwarding tools.`,
                subsections: [
                    {
                        text: c('Title').t`Set up forwarding`,
                        id: 'start-forward',
                    },
                    {
                        text: c('Title').t`Import messages`,
                        id: 'start-import',
                    },
                    {
                        text: c('Title').t`History`,
                        id: 'import-list',
                    },
                ],
            },
        },
    };
};
