import { useState } from 'react';

import { c } from 'ttag';

import { Button } from '@proton/atoms/Button';
import { Card } from '@proton/atoms/Card';

import { WasmMnemonic, WasmWallet, WasmWalletConfig } from '../../../../pkg';
import { useOnchainWalletContext } from '../../../contexts';
import { CreditCard } from './CreditCard';

interface Props {
    mnemonic?: WasmMnemonic;
    onContinue: () => void;
}

export const MnemonicBackup = ({ mnemonic, onContinue }: Props) => {
    const { network } = useOnchainWalletContext();

    const [showMnemonic, setShowMnemonic] = useState(false);

    const walletConfig = new WasmWalletConfig(network);
    const wallet = mnemonic ? new WasmWallet(mnemonic.asString(), undefined, walletConfig) : null;

    return (
        <div className="p-6 flex flex-column">
            {showMnemonic ? (
                <>
                    <span className="block h4 text-bold mx-auto">{c('Wallet setup').t`Your Mnemonic`}</span>

                    <p className="block text-center color-weak">{c('Wallet setup')
                        .t`This is your secret recovery phrase. If you lose access to your account, this phrase will let you recover your wallet.`}</p>

                    {/* Mnemonic words */}
                    <Card rounded bordered={false} className="flex flex-row justify-center">
                        {mnemonic?.toWords().map((word, index) => (
                            // TODO: use Pills component here
                            <span
                                className="block m-2 p-1 px-2 rounded text-sm"
                                key={`${index}_${word}`}
                                style={{
                                    background: 'var(--signal-info-minor-1)',
                                    color: 'var(--signal-info-major-3)',
                                }}
                            >
                                {index + 1}. {word}
                            </span>
                        ))}
                    </Card>

                    <p className="block text-center color-weak">{c('Wallet setup')
                        .t`Save these 12 words securely and never share them with anyone.`}</p>

                    <Button className="mt-2" color="norm" onClick={() => onContinue()}>
                        {c('Wallet setup').t`Continue`}
                    </Button>
                </>
            ) : (
                <>
                    <span className="block h4 text-bold mx-auto">{c('Wallet setup')
                        .t`Your Bitcoin Wallet is created`}</span>

                    {/* Credit card design */}
                    {/* TODO: add name input somewhere or generated it randomly? */}
                    {wallet && <CreditCard walletName="Bitcoin 01" walletFingerprint={wallet.getFingerprint()} />}

                    <p className="my-0 block text-center color-weak">{c('Wallet setup')
                        .t`Your new wallet is created. Make sure you back it up`}</p>

                    <Button className="mt-8" color="norm" onClick={() => setShowMnemonic(true)}>{c('Wallet setup')
                        .t`Back up your wallet`}</Button>
                </>
            )}
        </div>
    );
};
