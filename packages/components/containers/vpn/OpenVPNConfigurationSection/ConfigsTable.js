import { memo } from 'react';

import PropTypes from 'prop-types';
import { c } from 'ttag';

import { ButtonLike } from '@proton/atoms';
import { Button } from '@proton/atoms';
import { getVPNServerConfig } from '@proton/shared/lib/api/vpn';
import { PLANS } from '@proton/shared/lib/constants';
import { textToClipboard } from '@proton/shared/lib/helpers/browser';
import downloadFile from '@proton/shared/lib/helpers/downloadFile';
import clsx from '@proton/utils/clsx';
import isTruthy from '@proton/utils/isTruthy';

import {
    DropdownActions,
    Icon,
    SettingsLink,
    Table,
    TableBody,
    TableCell,
    TableRow,
    Tooltip,
} from '../../../components';
import { useApi, useNotifications, useUser } from '../../../hooks';
import Country from './Country';
import LoadIndicator from './LoadIndicator';
import { isP2PEnabled, isTorEnabled } from './utils';

export const CATEGORY = {
    SECURE_CORE: 'SecureCore',
    COUNTRY: 'Country',
    SERVER: 'Server',
    FREE: 'Free',
};

const PlusBadge = () => (
    <span className="ml-2">
        <Tooltip title="Plus">
            <div className="text-center rounded">P</div>
        </Tooltip>
    </span>
);

const ServerDown = () => (
    <span className="ml-2">
        <Tooltip title={c('Info').t`Server is currently down`}>
            <div className="flex inline-flex children-self-center">
                <Icon className="color-danger" size={20} name="exclamation-circle" />
            </div>
        </Tooltip>
    </span>
);

export const P2PIcon = () => (
    <span className="mx-2">
        <Tooltip title={c('Info').t`P2P`}>
            <Icon name="arrow-right-arrow-left" size={18} className="rounded bg-strong p-1" />
        </Tooltip>
    </span>
);

export const TorIcon = () => (
    <span className="mx-2">
        <Tooltip title={c('Info').t`Tor`}>
            <Icon name="brand-tor" size={18} className="rounded bg-strong p-1" />
        </Tooltip>
    </span>
);

const normalizeName = /** @param {Logical} server */ (server) => {
    let name = server.Name.toLowerCase()
        .replace(/[^a-zA-Z0-9.#-]/g, '')
        .replace(/[#.-]+/g, '-')
        .replace(/^[\s-]+/g, '')
        .replace(/[\s-]+$/g, '');

    if (name) {
        let needsFreeSuffix = server.Tier === 0 && name.indexOf('-free') === -1;

        name = name.replace(/^([a-zA-Z]{2}-)((?:[a-zA-Z]{2}-)?)(\d+)$/, (start, middle, end) => {
            if (needsFreeSuffix) {
                middle += 'free-';
            }

            needsFreeSuffix = false;

            return start + middle + end.padStart(2, '0');
        });

        if (needsFreeSuffix) {
            name += '-free';
        }
    }

    return name;
};

const getServerDomainFromName = /** @param {Logical} server */ (server) => {
    return normalizeName(server) + '.protonvpn.net';
};

// TODO: Add icons instead of text for p2p and tor when they are ready
const ConfigsTable = ({ loading, servers = [], platform, protocol, category, onSelect, selecting }) => {
    const api = useApi();
    const { createNotification } = useNotifications();
    const [{ hasPaidVpn }] = useUser();

    const getCopyButton = /** @param {Logical} server */ (server) => {
        const domain =
            (server.Servers.length === 1 ? server.Servers[0].Domain : null) || getServerDomainFromName(server);

        return {
            text: (
                <div className="flex flex-nowrap items-center justify-space-between">
                    <span className="mr-2">{domain}</span>
                    <Icon name="squares" title={c('Action').t`Copy`} />
                </div>
            ),
            onClick(event) {
                textToClipboard(domain, event.currentTarget);
                createNotification({
                    text: c('Success').t`${domain} copied to your clipboard`,
                });
            },
        };
    };

    const handleClickDownload =
        ({ ID, ExitCountry, Tier, Name }) =>
        async () => {
            const buffer = await api(
                getVPNServerConfig({
                    LogicalID: category === CATEGORY.COUNTRY ? undefined : ID,
                    Platform: platform,
                    Protocol: protocol,
                    Country: ExitCountry,
                })
            );
            const blob = new Blob([buffer], { type: 'application/x-openvpn-profile' });
            const name = category === CATEGORY.COUNTRY ? ExitCountry.toLowerCase() : normalizeName({ Tier, Name });
            downloadFile(blob, `${name}.${protocol}.ovpn`);
        };

    return (
        <Table hasActions>
            <thead>
                <tr>
                    <TableCell
                        className={clsx(['w-auto', category === CATEGORY.SERVER ? 'md:w-1/4' : 'md:w-1/3'])}
                        type="header"
                    >
                        {[CATEGORY.SERVER, CATEGORY.FREE].includes(category)
                            ? c('TableHeader').t`Name`
                            : c('TableHeader').t`Country`}
                    </TableCell>
                    {category === CATEGORY.SERVER ? (
                        <TableCell className="w-auto md:w-1/4" type="header">{c('TableHeader').t`City`}</TableCell>
                    ) : null}
                    <TableCell
                        className={clsx(['w-auto', category === CATEGORY.SERVER ? 'md:w-1/4' : 'md:w-1/3'])}
                        type="header"
                    >{c('TableHeader').t`Status`}</TableCell>
                    <TableCell
                        className={clsx(['w-auto', category === CATEGORY.SERVER ? 'md:w-1/4' : 'md:w-1/3'])}
                        type="header"
                    >{c('TableHeader').t`Action`}</TableCell>
                </tr>
            </thead>
            <TableBody loading={loading} colSpan={4}>
                {servers.map(
                    /** @param {Logical} server */ (server) => (
                        <TableRow
                            key={server.ID}
                            cells={[
                                [CATEGORY.SERVER, CATEGORY.FREE].includes(category) ? (
                                    server.Name
                                ) : (
                                    <Country key="country" server={server} />
                                ),
                                category === CATEGORY.SERVER ? (
                                    <div className="inline-flex children-self-center" key="city">
                                        {server.City}
                                    </div>
                                ) : null,
                                <div className="inline-flex children-self-center" key="status">
                                    <LoadIndicator server={server} />
                                    {server.Tier === 2 && <PlusBadge />}
                                    {server.Servers.every(({ Status }) => !Status) && <ServerDown />}
                                    {isP2PEnabled(server.Features) && <P2PIcon />}
                                    {isTorEnabled(server.Features) && <TorIcon />}
                                </div>,
                                server.isUpgradeRequired ? (
                                    <Tooltip
                                        key="download"
                                        title={
                                            server.Tier === 2
                                                ? c('Info').t`Plus or Visionary subscription required`
                                                : c('Info').t`Basic, Plus or Visionary subscription required`
                                        }
                                    >
                                        <ButtonLike
                                            as={SettingsLink}
                                            color="norm"
                                            size="small"
                                            path={hasPaidVpn ? `/dashboard?plan=${PLANS.VPN}` : '/upgrade'}
                                        >{c('Action').t`Upgrade`}</ButtonLike>
                                    </Tooltip>
                                ) : onSelect ? (
                                    <Button size="small" onClick={() => onSelect(server)} loading={selecting}>{c(
                                        'Action'
                                    ).t`Create`}</Button>
                                ) : (
                                    <DropdownActions
                                        key="dropdown"
                                        size="small"
                                        list={[
                                            {
                                                text: c('Action').t`Download`,
                                                onClick: handleClickDownload(server),
                                            },
                                            category !== CATEGORY.SECURE_CORE && getCopyButton(server),
                                        ].filter(isTruthy)}
                                    />
                                ),
                            ].filter(isTruthy)}
                        />
                    )
                )}
            </TableBody>
        </Table>
    );
};

ConfigsTable.propTypes = {
    onSelect: PropTypes.func,
    selecting: PropTypes.bool,
    category: PropTypes.oneOf([CATEGORY.SECURE_CORE, CATEGORY.COUNTRY, CATEGORY.SERVER, CATEGORY.FREE]),
    platform: PropTypes.string,
    protocol: PropTypes.string,
    loading: PropTypes.bool,
    servers: PropTypes.arrayOf(
        PropTypes.shape({
            ID: PropTypes.string,
            Country: PropTypes.string,
            EntryCountry: PropTypes.string,
            ExitCountry: PropTypes.string,
            Domain: PropTypes.string,
            Features: PropTypes.number,
            Load: PropTypes.number,
            Tier: PropTypes.number,
        })
    ),
};

export default memo(ConfigsTable);
