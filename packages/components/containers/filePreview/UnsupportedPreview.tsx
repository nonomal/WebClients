import { c } from 'ttag';

import corruptedPreviewSvg from '@proton/styles/assets/img/errors/broken-image.svg';
import unsupportedPreviewSvg from '@proton/styles/assets/img/errors/preview-unavailable.svg';
import clsx from '@proton/utils/clsx';

import { PrimaryButton } from '../../components';
import { useActiveBreakpoint } from '../../hooks';

interface Props {
    type?: 'file' | 'image' | 'video' | 'audio';
    onDownload?: () => void;
    browser?: boolean;
}

const UnsupportedPreview = ({ onDownload, type = 'file', browser = false }: Props) => {
    const { isNarrow } = useActiveBreakpoint();

    return (
        <div className="absolute-center text-center w-full px-4">
            <img
                className="mb-4 w-custom"
                style={{ '--w-custom': '5rem' }}
                src={type === 'file' ? unsupportedPreviewSvg : corruptedPreviewSvg}
                alt={c('Info').t`Unsupported file`}
                data-testid="file-preview:unsupported-preview-image"
            />

            <h2
                className={clsx(['p-1 text-bold', isNarrow && 'h3'])}
                data-testid="file-preview:unsupported-preview-text"
            >
                {browser
                    ? c('Info').t`Preview for this file type is currently not supported on this browser.`
                    : c('Info').t`Preview for this file type is not supported`}
            </h2>
            {browser && <h3 className="pb-1">{c('Info').t`Please use another browser or download the file.`}</h3>}

            {onDownload && (
                <PrimaryButton size={!isNarrow ? 'large' : undefined} className="text-bold" onClick={onDownload}>{c(
                    'Action'
                ).t`Download`}</PrimaryButton>
            )}
        </div>
    );
};

export default UnsupportedPreview;
