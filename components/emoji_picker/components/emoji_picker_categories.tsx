// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {KeyboardEvent, memo, useMemo} from 'react';

import {EmojiCategory} from 'mattermost-redux/types/emojis';

import {RECENT_EMOJI_CATEGORY, CATEGORIES} from '../constants';

import EmojiPickerCategory from './emoji_picker_category';

interface Props {
    recentEmojis: string[];
    filter: string;
    onClick: (categoryName: string) => void;
    onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => void;
}

function EmojiPickerCategories({
    recentEmojis,
    filter,
    onClick,
    onKeyDown,
}: Props) {
    const categories = useMemo(() => (recentEmojis.length ? {...RECENT_EMOJI_CATEGORY, ...CATEGORIES} : CATEGORIES), [recentEmojis]);

    // change this
    // const currentCategoryName = filter ? categoryKeys[0] : categoryKeys[1];

    const emojiPickerCategories = useMemo(() => Object.keys(categories).map((categoryName) => {
        const category = categories[categoryName as EmojiCategory];

        return (
            <EmojiPickerCategory
                key={'header-' + category.name}
                category={category}
                icon={<i className={category.className}/>}
                onCategoryClick={onClick}
                selected={false} // change this
                enable={filter.length === 0}
            />
        );
    }), [categories, filter]);

    return (
        <div
            id='emojiPickerCategories'
            className='emoji-picker__categories'
            onKeyDown={onKeyDown}
        >
            {emojiPickerCategories}
        </div>
    );
}

function propsAreEqual(prevProps: Props, nextProps: Props) {
    return prevProps.recentEmojis === nextProps.recentEmojis && prevProps.filter === nextProps.filter;
}

export default memo(EmojiPickerCategories, propsAreEqual);
