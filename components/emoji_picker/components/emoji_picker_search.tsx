// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {
    ChangeEvent,
    forwardRef,
    KeyboardEvent,
    memo,
    useCallback,
} from 'react';
import {FormattedMessage} from 'react-intl';

import {t} from 'utils/i18n';

import LocalizedInput from 'components/localized_input/localized_input';

import EmojiPickerSkin from './emoji_picker_skin';

interface Props {
    filter: string;
    userSkinTone: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
    onKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
    setUserSkinTone: (skinTone: string) => void;
}

const EmojiPickerSearch = forwardRef(({filter, onChange, onKeyDown, userSkinTone, setUserSkinTone}: Props, ref?: React.Ref<HTMLInputElement>) => {
    const handleSkinChange = useCallback(
        (skin: string) => {
            setUserSkinTone(skin);
        },
        [setUserSkinTone],
    );

    return (
        <div className='emoji-picker__search-container'>
            <div className='emoji-picker__text-container'>
                <span className='icon-magnify icon emoji-picker__search-icon'/>
                <FormattedMessage
                    id='emoji_picker.search_emoji'
                    defaultMessage='Search for an emoji'
                >
                    {(ariaLabel) => (
                        <LocalizedInput
                            id='emojiPickerSearch'
                            aria-label={`${ariaLabel}`}
                            ref={ref}
                            className='emoji-picker__search'
                            data-testid='emojiInputSearch'
                            type='text'
                            onChange={onChange}
                            onKeyDown={onKeyDown}
                            autoComplete='off'
                            placeholder={{
                                id: t('emoji_picker.search'),
                                defaultMessage: 'Search Emoji',
                            }}
                            value={filter}
                        />
                    )}
                </FormattedMessage>
            </div>
            <EmojiPickerSkin
                userSkinTone={userSkinTone}
                onSkinSelected={handleSkinChange}
            />
        </div>
    );
});

EmojiPickerSearch.displayName = 'EmojiPickerSearch';

function propsAreEqual(prevProps: Props, nextProps: Props) {
    return (
        prevProps.filter === nextProps.filter &&
        prevProps.userSkinTone === nextProps.userSkinTone
    );
}

export default memo(EmojiPickerSearch, propsAreEqual);
