import { type FC } from 'react';
import { useSelector } from 'react-redux';

import { c, msgid } from 'ttag';

import { ActionCard } from '@proton/pass/components/Layout/Card/ActionCard';
import { selectItemReport } from '@proton/pass/store/selectors';
import type { SelectedItem } from '@proton/pass/types';

export const ItemReport: FC<SelectedItem> = (item) => {
    const report = useSelector(selectItemReport(item));
    const duplicatesCount = report.password.duplicates.length;

    return (
        <>
            {duplicatesCount > 1 && (
                <div className="py-4">
                    <ActionCard
                        icon="exclamation-filled"
                        title={c('Title').t`Reused passwords`}
                        subtitle={
                            <>
                                <div>
                                    {duplicatesCount < 5
                                        ? c('Description').ngettext(
                                              msgid`${duplicatesCount} other login use this password:`,
                                              `${duplicatesCount} other logins use this password:`,
                                              duplicatesCount
                                          )
                                        : // translator full sentence is "X other login use this password", in this usecase X is allwas >5 and the text "X other login" is displayed as pill
                                          c('Description').jt`${duplicatesCount} other logins use this password`}
                                </div>
                                <div>{c('Description')
                                    .t`Visit the website and generate a unique password for this item.`}</div>
                            </>
                        }
                        pillLabel={duplicatesCount}
                        type="warning"
                    />
                </div>
            )}
        </>
    );
};
