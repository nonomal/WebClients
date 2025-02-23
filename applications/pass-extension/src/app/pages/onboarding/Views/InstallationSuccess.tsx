import type { VFC } from 'react';
import { useEffect, useState } from 'react';

import { ExtensionHead } from 'proton-pass-extension/lib/components/Extension/ExtensionHead';
import { useNavigateToLogin } from 'proton-pass-extension/lib/hooks/useNavigateToLogin';
import { c } from 'ttag';

import { Button } from '@proton/atoms/Button';
import { useNotifications } from '@proton/components';
import passBrandText from '@proton/pass/assets/protonpass-brand.svg';
import { SubTheme } from '@proton/pass/components/Layout/Theme/types';
import { chromeAPI } from '@proton/pass/lib/globals/browser';
import type { MaybeNull } from '@proton/pass/types';
import { FORK_TYPE } from '@proton/shared/lib/authentication/ForkInterface';
import { BRAND_NAME, PASS_APP_NAME } from '@proton/shared/lib/constants';

import './InstallationSuccess.scss';

const getSteps = () => [
    {
        key: 'open',
        icon: '/assets/extension-menu.svg',
        description: c('Info').t`Open the Extensions menu`,
    },
    {
        key: 'pin',
        icon: '/assets/extension-pin.svg',
        description: c('Info').t`Pin ${PASS_APP_NAME} to your toolbar`,
    },
    {
        key: 'access',
        icon: '/assets/protonpass-icon.svg',
        description: c('Info').t`Click the icon to open it anytime.`,
    },
];

const brandNameJSX = (
    <img src={passBrandText} className="ml-2 h-custom" style={{ '--h-custom': '1.75rem' }} key="brand" alt="" />
);

export const InstallationSuccess: VFC = () => {
    const login = useNavigateToLogin({ replace: true });
    const [isPinned, setIsPinned] = useState<MaybeNull<boolean>>(null);

    const { createNotification } = useNotifications();

    const nextStep = (): Promise<boolean> | true =>
        BUILD_TARGET === 'chrome'
            ? chromeAPI.action
                  .getUserSettings()
                  .then((setting) => setting.isOnToolbar)
                  .catch(() => true)
            : true;

    useEffect(() => {
        if (isPinned === false) {
            createNotification({
                text: c('Error').t`Please pin the extension or select "Continue without pinning".`,
                type: 'error',
                showCloseButton: false,
            });
        }
    }, [isPinned]);

    const handleNextStepClick = async () => {
        setIsPinned(null);
        setIsPinned(await nextStep());
    };

    const steps = getSteps();

    return (
        <>
            <ExtensionHead title={c('Title').t`Thank you for installing ${PASS_APP_NAME}`} />
            <div className="pass-onboarding ui-prominent w-full min-h-custom mw" style={{ '--min-h-custom': '100vh' }}>
                <div className="m-auto p-14 color-norm flex flex-justify-center">
                    <div className="pass-onboarding--gradient"></div>
                    <div className="flex flex-column">
                        <div className="flex flex-column">
                            <div className="pt-2 flex flex-align-items-center gap-2 mb-4">
                                {
                                    <img
                                        src="/assets/protonpass-icon.svg"
                                        className="h-custom"
                                        style={{ '--h-custom': '2.25rem' }}
                                        alt={PASS_APP_NAME}
                                    />
                                }
                                <span>{brandNameJSX}</span>
                            </div>
                            <h1 className="pass-onboarding--white-text mt-4 mb-8 text-semibold">{c('Title')
                                .jt`Welcome to your new password manager!`}</h1>
                        </div>

                        <div className="flex flex-align-items-center gap-2 mb-4">
                            <span className="text-bold">Step {isPinned ? 2 : 1} of 2</span>
                            <hr className="pass-installation--white-separator my-2 flex flex-item-fluid-auto" />
                        </div>

                        <div className="mx-auto flex flex-justify-center flex-nowrap flex-column lg:flex-row gap-12">
                            {!isPinned && (
                                <>
                                    <div className="flex flex-nowrap flex-column">
                                        <h2 className="text-3xl pass-onboarding--white-text mb-4 text-bold">
                                            {c('Title').jt`Pin the extension`}
                                        </h2>
                                        <h2 className="text-xl mb-5">
                                            {c('Info').t`For easy access to your passwords and more.`}
                                        </h2>

                                        <div className="mb-1">
                                            <ol className="unstyled m-0">
                                                {steps.map(({ key, icon, description }, idx) => (
                                                    <li key={key} className="flex mb-5 flex-align-items-center">
                                                        <div
                                                            className="pass-installation--dot rounded-50 text-center mr-3 relative"
                                                            aria-hidden="true"
                                                        >
                                                            <span className="absolute absolute-center">{idx + 1}</span>
                                                        </div>
                                                        <div
                                                            className="w-custom text-center mr-2"
                                                            style={{ '--w-custom': '2.5rem' }}
                                                            aria-hidden="true"
                                                        >
                                                            <img
                                                                src={icon}
                                                                className="h-custom"
                                                                style={{ '--h-custom': '1.5rem' }}
                                                                alt={BRAND_NAME}
                                                            />
                                                        </div>

                                                        <div className="flex-item-fluid text-left">{description}</div>
                                                    </li>
                                                ))}
                                            </ol>
                                        </div>
                                        <Button
                                            icon
                                            pill
                                            size="large"
                                            shape="solid"
                                            color="norm"
                                            className="mt-5 mb-2"
                                            onClick={handleNextStepClick}
                                            aria-label={c('Action').t`Done`}
                                        >
                                            <span className="flex flex-justify-center px-4">
                                                {' '}
                                                {c('Action').t`Done`}
                                            </span>
                                        </Button>
                                        {BUILD_TARGET === 'chrome' && (
                                            <Button
                                                onClick={() => setIsPinned(true)}
                                                shape="ghost"
                                                aria-label={c('Action').t`Continue without pinning`}
                                                color="norm"
                                            >
                                                {c('Action').t`Continue without pinning`}
                                            </Button>
                                        )}
                                    </div>

                                    <div className="flex">
                                        <img src="/assets/pin-tutorial.gif" alt="" width="325" />
                                    </div>
                                </>
                            )}

                            {isPinned && (
                                <>
                                    <div className={`${SubTheme.VIOLET} flex flex-nowrap flex-column`}>
                                        <h2 className="text-3xl pass-onboarding--white-text mb-4 text-bold">
                                            {c('Title').jt`Connect your ${BRAND_NAME} Account`}
                                        </h2>
                                        <h2 className="text-xl mb-5">
                                            {c('Info').t`Sign in or create an account to continue.`}
                                        </h2>
                                        <Button
                                            pill
                                            size="large"
                                            shape="solid"
                                            color="norm"
                                            className="mb-4"
                                            onClick={() => login()}
                                            aria-label={c('Action').t`Sign in`}
                                        >
                                            <span className="flex flex-justify-center px-4">
                                                {c('Action').t`Connect your ${BRAND_NAME} Account`}
                                            </span>
                                        </Button>
                                        <Button
                                            pill
                                            size="large"
                                            shape="outline"
                                            color="weak"
                                            onClick={() => login(FORK_TYPE.SIGNUP)}
                                            aria-label={c('Action').t`Create an account`}
                                        >
                                            <span className="flex flex-justify-center px-4">
                                                {c('Action').t`Create a ${BRAND_NAME} Account`}
                                            </span>
                                        </Button>
                                    </div>

                                    <div className="flex flex-justify-center flex-align-items-center">
                                        <img
                                            src="assets/onboarding-connect-illustration.svg"
                                            alt=""
                                            className="pass-installation--connect-illustration"
                                            width="428"
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};
