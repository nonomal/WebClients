import { RefObject, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { FeatureCode, useFeature, useTheme } from '@proton/components';
import { DARK_THEMES } from '@proton/shared/lib/themes/themes';
import { isNewsLetter, isPlainText } from '@proton/shared/lib/mail/messages';
import { canSupportDarkStyle } from '../../../helpers/message/messageContent';
import { applyDarkStyle } from '../../../logic/messages/read/messagesReadActions';
import { MessageState } from '../../../logic/messages/messagesTypes';

const useMessageDarkStyles = (message: MessageState, isBodyLoaded: boolean, bodyRef: RefObject<HTMLDivElement>) => {
    const darkStylesFeature = useFeature(FeatureCode.DarkStylesInBody);
    const [theme] = useTheme();
    const dispatch = useDispatch();
    const isDarkTheme = DARK_THEMES.includes(theme);

    // canSupportDarkStyle is costly, so we only call it when needed
    const injectDarkStyle = useMemo(() => {
        return (
            darkStylesFeature.feature?.Value &&
            !message.messageDocument?.noDarkStyle &&
            isBodyLoaded &&
            isDarkTheme &&
            !isNewsLetter(message.data) &&
            !isPlainText(message.data) &&
            canSupportDarkStyle(bodyRef.current)
        );
    }, [
        darkStylesFeature.feature?.Value,
        message.data,
        message.messageDocument?.noDarkStyle,
        isDarkTheme,
        bodyRef.current,
    ]);

    useEffect(() => {
        if (injectDarkStyle) {
            setTimeout(() => {
                dispatch(applyDarkStyle({ ID: message.localID, hasDarkStyle: true }));
            });
        }
    }, [message.localID, injectDarkStyle]);

    return injectDarkStyle;
};

export default useMessageDarkStyles;
