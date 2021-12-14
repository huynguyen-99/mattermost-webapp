// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import * as Emoji from 'utils/emoji.jsx';

const categoryClass = new Map([
    ['recent', 'icon-clock-outline'],
    ['searchResults', ''],
    ['smileys-emotion', 'icon-emoticon-happy-outline'],
    ['people-body', 'icon-account-outline'],
    ['animals-nature', 'icon-leaf-outline'],
    ['food-drink', 'icon-food-apple'],
    ['activities', 'icon-basketball'],
    ['travel-places', 'icon-airplane-variant'],
    ['objects', 'icon-lightbulb-outline'],
    ['symbols', 'icon-heart-outline'],
    ['flags', 'icon-flag-outline'],
    ['custom', 'icon-emoticon-custom-outline'],
]);

export type Category = {
    name: string;
    id: string;
    className: string;
    message: string;
    offset: number;
};

function createCategory(name: string): Category {
    return {
        name,
        id: Emoji.CategoryTranslations.get(name),
        className: categoryClass.get(name) || '',
        message: Emoji.CategoryMessage.get(name),
        offset: 0,
    };
}

export const RECENT_EMOJI_CATEGORY = {recent: createCategory('recent')};

export const CATEGORIES: Record<string, Category> = Emoji.CategoryNames.
    filter((category) => !(category === 'recent' || category === 'searchResults')).
    reduce((previousCategory, currentCategory) => {
        return {
            ...previousCategory,
            [currentCategory]: createCategory(currentCategory),
        };
    }, {});
