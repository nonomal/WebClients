import { type VFC, useCallback, useEffect } from 'react';

import { c } from 'ttag';

import { Button } from '@proton/atoms';
import { Icon } from '@proton/components';
import type { ModalProps } from '@proton/components/components/modalTwo/Modal';
import { SidebarModal } from '@proton/pass/components/Layout/Modal/SidebarModal';
import { Panel } from '@proton/pass/components/Layout/Panel/Panel';
import { PanelHeader } from '@proton/pass/components/Layout/Panel/PanelHeader';
import { usePasswordGenerator } from '@proton/pass/hooks/usePasswordGenerator';

import { usePasswordContext } from './PasswordContext';
import { PasswordGenerator } from './PasswordGenerator';

export type BaseProps = { actionLabel?: string; className?: string; onSubmit?: (password: string) => void };
export type Props = Omit<ModalProps, 'onSubmit'> & BaseProps;

export const PasswordGeneratorModal: VFC<Props> = ({ onSubmit, actionLabel, ...props }) => {
    const { openPasswordHistory, options } = usePasswordContext();
    const passwordGenerator = usePasswordGenerator(options);
    const handleActionClick = useCallback(() => onSubmit?.(passwordGenerator.password), [passwordGenerator, onSubmit]);

    useEffect(() => {
        /* regenerate on each modal opening */
        if (props.open) passwordGenerator.regeneratePassword();
    }, [props.open]);

    return (
        <SidebarModal {...props}>
            <Panel
                header={
                    <PanelHeader
                        actions={[
                            <Button
                                key="close-modal-button"
                                className="flex-item-noshrink"
                                icon
                                pill
                                shape="solid"
                                onClick={props.onClose}
                            >
                                <Icon className="modal-close-icon" name="cross" alt={c('Action').t`Close`} />
                            </Button>,
                            <div className="flex gap-1" key="modal-actions-group">
                                {actionLabel && (
                                    <Button onClick={handleActionClick} color="norm" pill className="text-sm">
                                        {actionLabel}
                                    </Button>
                                )}
                                <Button
                                    icon
                                    pill
                                    shape="solid"
                                    className="flex-item-noshrink"
                                    onClick={passwordGenerator.regeneratePassword}
                                >
                                    <Icon name="arrows-rotate" alt={c('Action').t`Regenerate`} />
                                </Button>
                            </div>,
                        ]}
                    />
                }
            >
                <PasswordGenerator {...passwordGenerator} />

                <hr className="my-2" />

                <button
                    className="w-full flex flex-align-items-center flex-justify-space-between"
                    onClick={() => openPasswordHistory(true)}
                >
                    <span>{c('Label').t`Password history`}</span>
                    <Icon name="chevron-right" />
                </button>
            </Panel>
        </SidebarModal>
    );
};
