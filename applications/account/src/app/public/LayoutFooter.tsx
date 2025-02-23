import { c } from 'ttag';

import { Href } from '@proton/atoms';
import { APP_NAMES, BRAND_NAME } from '@proton/shared/lib/constants';
import { getPrivacyPolicyURL } from '@proton/shared/lib/helpers/url';

import { getLocaleTermsURL } from '../content/helper';

interface FooterProps {
    className?: string;
    version: string;
    app: APP_NAMES;
}

const LayoutFooter = ({ className, app, version }: FooterProps) => {
    return (
        <footer className={className}>
            <div className="auto-mobile">
                {
                    // translator: full sentence 'Proton. Privacy by default.'
                    c('Footer').t`${BRAND_NAME}. Privacy by default.`
                }
            </div>
            <div className="text-center m-0 pt-4 pb-0 sm:pb-4 flex-item-noshrink">
                <span className="auto-tiny-mobile">
                    <Href key="terms" className="signup-link link-focus" href={getLocaleTermsURL()}>{c('Link')
                        .t`Terms`}</Href>
                </span>
                <span className="color-border px-2 no-tiny-mobile" aria-hidden="true">
                    |
                </span>
                <span className="auto-tiny-mobile">
                    <Href key="privacy" className="signup-link link-focus old-link" href={getPrivacyPolicyURL(app)}>{c(
                        'Link'
                    ).t`Privacy policy`}</Href>
                </span>
                <span className="color-border px-2 no-tiny-mobile" aria-hidden="true">
                    |
                </span>
                <span className="no-tiny-mobile">{c('Info').jt`Version ${version}`}</span>
            </div>
        </footer>
    );
};

export default LayoutFooter;
