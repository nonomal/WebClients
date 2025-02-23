import { type VFC } from 'react';

import { c } from 'ttag';

import { OTPDonut } from '@proton/pass/components/Otp/OTPDonut';
import { OTPValue } from '@proton/pass/components/Otp/OTPValue';
import type { UsePeriodOtpCodeOptions } from '@proton/pass/hooks/usePeriodicOtpCode';
import { usePeriodicOtpCode } from '@proton/pass/hooks/usePeriodicOtpCode';

import { ValueControl } from './ValueControl';

/* This component handles the period otp code generation
 * to avoid cluttering the render cycle of a component in
 * need of the OTP code generation as it involves alot of
 * re-rendering. eg: we do not want to re-render `Login.view`
 * everytime the OTP countdown updates
 */
export const OTPValueControl: VFC<UsePeriodOtpCodeOptions & { label?: string }> = ({ totpUri, label, ...request }) => {
    const [otp, percent] = usePeriodicOtpCode({ totpUri, ...request });

    return (
        <ValueControl
            clickToCopy
            icon="lock"
            value={otp?.token ?? ''}
            label={label ?? c('Label').t`2FA token (TOTP)`}
            actions={<OTPDonut enabled={otp !== null} percent={percent} period={otp?.period} />}
        >
            <OTPValue code={otp?.token ?? ''} />
        </ValueControl>
    );
};
