import { c } from 'ttag';

import { WasmTxBuilder } from '@proton/andromeda';
import { Icon, useModalStateWithData } from '@proton/components/components';
import { useContactEmailsCache } from '@proton/components/containers/contacts/ContactEmailsProvider';
import useVerifyOutboundPublicKeys from '@proton/components/containers/keyTransparency/useVerifyOutboundPublicKeys';
import { useApi, useNotifications } from '@proton/components/hooks';
import { CryptoProxy, PublicKeyReference } from '@proton/crypto/lib';
import useLoading from '@proton/hooks/useLoading';
import { getAndVerifyApiKeys } from '@proton/shared/lib/api/helpers/getAndVerifyApiKeys';
import { validateEmailAddress } from '@proton/shared/lib/helpers/email';
import { ProcessedApiKey, Recipient } from '@proton/shared/lib/interfaces';
import { getKeyHasFlagsToVerify } from '@proton/shared/lib/keys';
import { useBitcoinNetwork, useWalletApiClients, verifySignedData } from '@proton/wallet';
import { MAX_RECIPIENTS_PER_TRANSACTIONS } from '@proton/wallet/utils/email-integration';

import { Button } from '../../atoms';
import { TxBuilderUpdater } from '../../hooks/useTxBuilder';
import { isUndefined, isValidBitcoinAddress } from '../../utils';
import { EmailOrBitcoinAddressInput } from '../EmailOrBitcoinAddressInput';
import {
    InvalidRecipientErrorCode,
    useEmailAndBtcAddressesMaps,
} from '../EmailOrBitcoinAddressInput/useEmailAndBtcAddressesMaps';
import { InviteSentConfirmModal } from '../InviteSentConfirmModal';
import { RecipientDetailsModal } from '../RecipientDetailsModal';
import { WalletNotFoundErrorDropdown } from './WalletNotFoundError/WalletNotFoundErrorDropdown';
import { WalletNotFoundErrorModal } from './WalletNotFoundError/WalletNotFoundErrorModal';

interface Props {
    recipientHelpers: ReturnType<typeof useEmailAndBtcAddressesMaps>;
    onRecipientsConfirm: () => void;
    txBuilder: WasmTxBuilder;
    updateTxBuilder: (updater: TxBuilderUpdater) => void;
}

const getVerifiedAddressKey = async (
    addressKeys: ProcessedApiKey[],
    btcAddress: string,
    btcAddressSignature: string
): Promise<PublicKeyReference | undefined> => {
    const keys = await Promise.allSettled(
        addressKeys
            .filter((k) => {
                return getKeyHasFlagsToVerify(k.flags);
            })
            .map(async (addressKey) => {
                const pubkey = await CryptoProxy.importPublicKey({ armoredKey: addressKey.armoredKey });
                const isVerified = await verifySignedData(btcAddress, btcAddressSignature, 'wallet.bitcoin-address', [
                    pubkey,
                ]);

                return isVerified ? pubkey : null;
            })
    );

    const [firstAddressKey] = keys
        .map((result) => ('value' in result ? result.value : undefined))
        .filter((key): key is PublicKeyReference => !!key);

    return firstAddressKey;
};

export const RecipientsSelection = ({ recipientHelpers, txBuilder, onRecipientsConfirm, updateTxBuilder }: Props) => {
    const {
        recipientEmailMap,
        addValidRecipient,
        addInvalidRecipient,
        removeRecipient,
        exists,
        addRecipientWithSentInvite,
        checkHasSentInvite,
    } = recipientHelpers;

    const verifyOutboundPublicKeys = useVerifyOutboundPublicKeys();
    const { contactEmails, contactEmailsMap } = useContactEmailsCache();
    const [loadingBitcoinAddressLookup, withLoadingBitcoinAddressLookup] = useLoading();
    const [walletNotFoundModal, setWalletNotFoundModal] = useModalStateWithData<{ email: string }>();
    const { createNotification } = useNotifications();
    const [inviteSentConfirmModal, setInviteSentConfirmModal] = useModalStateWithData<{ email: string }>();
    const [recipientDetailsModal, setRecipientDetailsModal] = useModalStateWithData<{
        recipient: Recipient;
        btcAddress: string;
        index: number;
    }>();
    const [network] = useBitcoinNetwork();
    const walletApi = useWalletApiClients();
    const api = useApi();

    const safeAddRecipient = (
        recipientOrBitcoinAddress: Recipient,
        btcAddress: string,
        addressKey?: PublicKeyReference
    ) => {
        if (!exists(recipientOrBitcoinAddress)) {
            addValidRecipient(recipientOrBitcoinAddress, btcAddress, addressKey);
            updateTxBuilder((txBuilder) => txBuilder.addRecipient(btcAddress));
        }
    };

    const handleSendInvite = async (email: string) => {
        try {
            await walletApi.invite.sendEmailIntegrationInvite(email);

            walletNotFoundModal.onClose();
            setInviteSentConfirmModal({ email });

            addRecipientWithSentInvite(email);
            createNotification({ text: c('Bitcoin send').t`Invitation sent to the recipient` });
        } catch {
            createNotification({ text: c('Bitcoin send').t`Could not send invitation to the recipient` });
        }
    };

    const handleAddRecipients = async (recipientOrBitcoinAddresses: Recipient[]) => {
        if (isUndefined(network)) {
            return;
        }

        const remainingSlot = Math.max(MAX_RECIPIENTS_PER_TRANSACTIONS - Object.values(recipientEmailMap).length, 0);

        for (const recipientOrBitcoinAddress of recipientOrBitcoinAddresses.slice(0, remainingSlot)) {
            if (validateEmailAddress(recipientOrBitcoinAddress?.Address)) {
                try {
                    const bitcoinAddress = await walletApi.email_integration.lookupBitcoinAddress(
                        recipientOrBitcoinAddress.Address
                    );

                    const btcAddress = bitcoinAddress.Data.BitcoinAddress;
                    const btcAddressSignature = bitcoinAddress.Data.BitcoinAddressSignature;

                    if (!btcAddress) {
                        addInvalidRecipient(
                            recipientOrBitcoinAddress,
                            InvalidRecipientErrorCode.NoAddressSetOnBitcoinAddress
                        );
                        continue;
                    }

                    if (!btcAddressSignature) {
                        addInvalidRecipient(
                            recipientOrBitcoinAddress,
                            InvalidRecipientErrorCode.NoSignatureSetOnBitcoinAddress
                        );
                        continue;
                    }

                    // Bitcoin address signature verification
                    const { addressKeys } = await getAndVerifyApiKeys({
                        api,
                        email: recipientOrBitcoinAddress.Address,
                        internalKeysOnly: true,
                        verifyOutboundPublicKeys,
                    });

                    const addressKey = await getVerifiedAddressKey(addressKeys, btcAddress, btcAddressSignature);

                    if (!addressKey) {
                        addInvalidRecipient(
                            recipientOrBitcoinAddress,
                            InvalidRecipientErrorCode.BitcoinAddressSignatureCouldNotBeVerified
                        );
                    } else {
                        safeAddRecipient(recipientOrBitcoinAddress, btcAddress, addressKey);
                    }
                } catch {
                    const hasRecipientSentInvite =
                        checkHasSentInvite(recipientOrBitcoinAddress.Address) ||
                        (await walletApi.invite
                            .checkInviteStatus(recipientOrBitcoinAddress.Address)
                            .then(() => false)
                            .catch(() => true));

                    if (hasRecipientSentInvite) {
                        addRecipientWithSentInvite(recipientOrBitcoinAddress.Address);
                    } else {
                        setWalletNotFoundModal({ email: recipientOrBitcoinAddress.Address });
                    }

                    addInvalidRecipient(
                        recipientOrBitcoinAddress,
                        InvalidRecipientErrorCode.CouldNotFindBitcoinAddressLinkedToEmail
                    );
                }
            } else if (isValidBitcoinAddress(recipientOrBitcoinAddress.Address, network)) {
                safeAddRecipient(recipientOrBitcoinAddress, recipientOrBitcoinAddress.Address);
            } else {
                addInvalidRecipient(recipientOrBitcoinAddress, InvalidRecipientErrorCode.InvalidAddress);
            }
        }
    };

    const handleRemoveRecipient = (recipient: Recipient) => {
        const recipientToRemove = recipientEmailMap[recipient.Address];
        const indexToRemove = txBuilder.getRecipients().findIndex((r) => r[1] === recipientToRemove?.btcAddress.value);

        updateTxBuilder((txBuilder) => txBuilder.removeRecipient(indexToRemove));
        removeRecipient(recipient);
    };

    if (isUndefined(network)) {
        return null;
    }

    return (
        <>
            <div className="relative flex flex-column max-w-full justify-center">
                <h2 className="text-center mb-8 text-semibold">{c('Wallet send')
                    .t`Who are you sending Bitcoin to?`}</h2>

                <EmailOrBitcoinAddressInput
                    disabled={Object.values(loadingBitcoinAddressLookup).some((v) => Boolean(v))}
                    placeholder={'andy.yen@proton.ch / bc1...'}
                    contactEmails={contactEmails}
                    contactEmailsMap={contactEmailsMap}
                    recipientEmailMap={recipientEmailMap}
                    network={network}
                    loading={loadingBitcoinAddressLookup}
                    fetchedEmailListItemRightNode={({ email, error }) => {
                        if (error === InvalidRecipientErrorCode.CouldNotFindBitcoinAddressLinkedToEmail) {
                            return (
                                <WalletNotFoundErrorDropdown
                                    hasSentInvite={checkHasSentInvite(email)}
                                    email={email}
                                    onSendInvite={handleSendInvite}
                                />
                            );
                        }

                        if (error === InvalidRecipientErrorCode.InvalidAddress) {
                            return (
                                <span className="block text-sm color-danger w-1/3">{c('Wallet send')
                                    .t`Address is neither a valid bitcoin or email address`}</span>
                            );
                        }

                        if (error) {
                            return (
                                <span className="block text-sm color-danger w-1/3">{c('Wallet send')
                                    .t`Bitcoin address signature could not be verified`}</span>
                            );
                        }

                        return (
                            <span className="mr-1 color-weak">
                                <Icon name="chevron-right" className="my-auto" />
                            </span>
                        );
                    }}
                    onClickRecipient={(recipient, btcAddress, index) => {
                        if (btcAddress.value) {
                            setRecipientDetailsModal({ recipient, btcAddress: btcAddress.value, index });
                        }
                    }}
                    onAddRecipients={(recipients: Recipient[]) => {
                        void withLoadingBitcoinAddressLookup(handleAddRecipients(recipients));
                    }}
                    onRemoveRecipient={(recipient: Recipient) => handleRemoveRecipient(recipient)}
                />

                {txBuilder.getRecipients().length ? (
                    <div className="px-10 mt-6">
                        <Button
                            color="norm"
                            shape="solid"
                            size="large"
                            shadow
                            fullWidth
                            onClick={() => {
                                onRecipientsConfirm();
                            }}
                        >{c('Wallet send').t`Confirm`}</Button>
                    </div>
                ) : null}
            </div>

            {recipientDetailsModal.data && (
                <RecipientDetailsModal {...recipientDetailsModal.data} {...recipientDetailsModal} />
            )}

            {walletNotFoundModal.data && (
                <WalletNotFoundErrorModal
                    onSendInvite={handleSendInvite}
                    email={walletNotFoundModal.data.email}
                    {...walletNotFoundModal}
                />
            )}

            {inviteSentConfirmModal.data && (
                <InviteSentConfirmModal email={inviteSentConfirmModal.data.email} {...inviteSentConfirmModal} />
            )}
        </>
    );
};
