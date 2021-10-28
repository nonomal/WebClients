import { Draft } from 'immer';
import { PayloadAction } from '@reduxjs/toolkit';
import { Message } from '@proton/shared/lib/interfaces/mail/Message';
import {
    ConversationErrors,
    ConversationParams,
    ConversationResult,
    ConversationsState,
    ConversationState,
} from './conversationsTypes';
import { conversationByID } from './conversationsSelectors';
import { RootState } from '../store';
import { Conversation } from '../../models/conversation';
import { isNetworkError, isNotExistError } from '../../helpers/errors';
import {
    applyLabelChangesOnConversation,
    applyLabelChangesOnMessage,
    LabelChanges,
    UnreadStatus,
} from '../../helpers/labels';
import {
    applyMarkAsChangesOnConversation,
    applyMarkAsChangesOnMessage,
    MarkAsChanges,
} from '../../hooks/optimistic/useOptimisticMarkAs';
import { mergeConversations } from '../../helpers/conversation';

export const globalReset = (state: Draft<ConversationsState>) => {
    Object.keys(state).forEach((key) => delete state[key]);
};

const getConversation = (state: Draft<ConversationsState>, ID: string) =>
    conversationByID({ conversations: state } as RootState, { ID });

export const initialize = (state: Draft<ConversationsState>, action: PayloadAction<ConversationState>) => {
    state[action.payload.Conversation.ID] = action.payload as any;
};

export const loadFulfilled = (
    state: Draft<ConversationsState>,
    action: PayloadAction<ConversationResult, string, { arg: ConversationParams }>
) => {
    const { Conversation, Messages } = action.payload;
    const { conversationID } = action.meta.arg;

    const conversationState = getConversation(state, conversationID);

    if (conversationState) {
        conversationState.Conversation = Conversation;
        conversationState.Messages = Messages;
        conversationState.loadRetry = conversationState.loadRetry ? conversationState.loadRetry + 1 : 1;
        conversationState.errors = { network: [], unknown: [] };
    } else {
        state[Conversation.ID] = {
            Conversation,
            Messages,
            loadRetry: 1,
            errors: { network: [], unknown: [] },
        };
    }
};

export const loadRejected = (
    state: Draft<ConversationsState>,
    action: PayloadAction<any, string, { arg: ConversationParams }>
) => {
    const error = action.payload;

    const errors: ConversationErrors = {};
    if (isNetworkError(error)) {
        errors.network = [error];
    } else if (isNotExistError(error)) {
        errors.notExist = [error];
    } else {
        errors.unknown = [error];
    }

    const { conversationID } = action.meta.arg;

    const conversationState = getConversation(state, conversationID);

    if (conversationState) {
        conversationState.errors = errors;
        conversationState.loadRetry = conversationState.loadRetry ? conversationState.loadRetry + 1 : 1;
    }
};

export const retryLoading = (state: Draft<ConversationsState>, { payload: { ID } }: PayloadAction<{ ID: string }>) => {
    const conversationState = getConversation(state, ID);

    if (conversationState) {
        conversationState.loadRetry = 0;
        conversationState.errors = {};
    }
};

export const applyLabelsOnConversationMessages = (
    state: Draft<ConversationsState>,
    {
        payload: { ID, messageID, changes, unreadStatuses, updatedConversation, conversationResult },
    }: PayloadAction<{
        ID: string;
        messageID: string;
        changes: LabelChanges;
        unreadStatuses: UnreadStatus[] | undefined;
        updatedConversation: Conversation;
        conversationResult: ConversationState;
    }>
) => {
    const conversationState = getConversation(state, ID);

    if (conversationState) {
        conversationState.Conversation = updatedConversation;
        conversationState.Messages = conversationResult.Messages?.map((messageFromConversation: Message) => {
            if (messageFromConversation.ID === messageID) {
                return applyLabelChangesOnMessage(messageFromConversation, changes, unreadStatuses);
            }
            return messageFromConversation;
        });
    }
};

export const applyLabelsOnConversation = (
    state: Draft<ConversationsState>,
    {
        payload: { ID, changes, unreadStatuses },
    }: PayloadAction<{ ID: string; changes: LabelChanges; unreadStatuses: UnreadStatus[] | undefined }>
) => {
    const conversationState = getConversation(state, ID);

    if (conversationState) {
        conversationState.Conversation = applyLabelChangesOnConversation(
            conversationState.Conversation,
            changes,
            unreadStatuses
        );
    }
};

export const optimisticDelete = (state: Draft<ConversationsState>, { payload: ID }: PayloadAction<string>) => {
    delete state[ID];
};

export const optimisticDeleteConversationMessages = (
    state: Draft<ConversationsState>,
    { payload: { ID, messages } }: PayloadAction<{ ID: string; messages: Message[] }>
) => {
    const conversationState = getConversation(state, ID);

    if (conversationState) {
        conversationState.Messages = messages;
    }
};

export const optimisticRestore = (
    state: Draft<ConversationsState>,
    { payload: conversations }: PayloadAction<ConversationState[]>
) => {
    conversations.forEach((conversation) => {
        state[conversation.Conversation.ID] = conversation;
    });
};

export const optimisticMarkAsConversationMessages = (
    state: Draft<ConversationsState>,
    {
        payload: { ID, messageID, updatedConversation, changes },
    }: PayloadAction<{ ID: string; messageID: string; updatedConversation: Conversation; changes: MarkAsChanges }>
) => {
    const conversationState = getConversation(state, ID);

    if (conversationState) {
        conversationState.Conversation = updatedConversation;
        conversationState.Messages = conversationState.Messages?.map((conversationMessage) => {
            if (conversationMessage.ID === messageID) {
                return applyMarkAsChangesOnMessage(conversationMessage, changes);
            }
            return conversationMessage;
        });
    }
};

export const optimisticMarkAsConversation = (
    state: Draft<ConversationsState>,
    { payload: { ID, labelID, changes } }: PayloadAction<{ ID: string; labelID: string; changes: MarkAsChanges }>
) => {
    const conversationState = getConversation(state, ID);

    if (conversationState) {
        conversationState.Conversation = applyMarkAsChangesOnConversation(
            conversationState.Conversation,
            labelID,
            changes
        );
    }
};

export const deleteConversation = (state: Draft<ConversationsState>, { payload: ID }: PayloadAction<string>) => {
    delete state[ID];
};

export const updateConversation = (
    state: Draft<ConversationsState>,
    { payload: { ID, updates } }: PayloadAction<{ ID: string; updates: Partial<ConversationState> }>
) => {
    const currentConversation = state[ID];
    const updatedConversation = mergeConversations(currentConversation, updates);

    state[ID] = updatedConversation;
};
