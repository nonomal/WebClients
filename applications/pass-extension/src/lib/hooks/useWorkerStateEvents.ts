import { useEffect } from 'react';

import { ExtensionContext } from 'proton-pass-extension/lib/context/extension-context';

import type { MessageWithSenderFactory } from '@proton/pass/lib/extension/message';
import { sendMessage } from '@proton/pass/lib/extension/message';
import type {
    ExtensionEndpoint,
    TabId,
    WorkerMessageResponse,
    WorkerMessageWithSender,
    WorkerState,
} from '@proton/pass/types';
import { WorkerMessageType, WorkerStatus } from '@proton/pass/types';
import { logger } from '@proton/pass/utils/logger';

type WakeupOptions = { tabId: TabId; endpoint: ExtensionEndpoint; messageFactory: MessageWithSenderFactory };
type UseWorkerStateEventsOptions = WakeupOptions & { onWorkerStateChange: (state: WorkerState) => void };

const wakeup = (options: WakeupOptions): Promise<WorkerMessageResponse<WorkerMessageType.WORKER_WAKEUP>> =>
    sendMessage.on(
        options.messageFactory({
            type: WorkerMessageType.WORKER_WAKEUP,
            payload: { tabId: options.tabId },
        }),
        (response) => {
            if (response.type === 'success') return response;
            else {
                logger.warn(`[Endpoint::${options.endpoint}] wakeup failed`, response.error);
                throw new Error();
            }
        }
    );

export const useWorkerStateEvents = ({ onWorkerStateChange, ...options }: UseWorkerStateEventsOptions) => {
    useEffect(() => {
        const onMessage = (message: WorkerMessageWithSender) => {
            if (message.sender === 'background' && message.type === WorkerMessageType.WORKER_STATUS) {
                onWorkerStateChange(message.payload.state);
            }
        };

        ExtensionContext.get().port.onMessage.addListener(onMessage);

        wakeup(options)
            .then(({ UID, loggedIn, status }) => onWorkerStateChange({ UID, loggedIn, status }))
            .catch(() => onWorkerStateChange({ UID: undefined, loggedIn: false, status: WorkerStatus.ERROR }));

        return () => ExtensionContext.get().port.onMessage.removeListener(onMessage);
    }, []);
};
