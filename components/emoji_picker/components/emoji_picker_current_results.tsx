// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React, {forwardRef, memo, useMemo} from 'react';
import {FormattedMessage} from 'react-intl';

import {Emoji, EmojiCategory} from 'mattermost-redux/types/emojis';

import {NoResultsVariant} from 'components/no_results_indicator/types';
import NoResultsIndicator from 'components/no_results_indicator';

import {Categories} from '../types';

import {SEARCH_EMOJI_CATEGORY} from '../constants';

import {getEmojisByCategory} from '../utils';

import EmojiPickerItem from './emoji_picker_item';

// If this changes, the spaceRequiredAbove and spaceRequiredBelow props passed to the EmojiPickerOverlay must be updated
const EMOJI_CONTAINER_HEIGHT = 290;
const EMOJI_CONTAINER_STYLE = {
    height: EMOJI_CONTAINER_HEIGHT,
};

interface Props {
    filter: string;
    categories: Categories;
    allEmojis: Record<string, Emoji>;
    recentEmojis: string[];
}

const EmojiPickerCurrentResults = forwardRef<HTMLDivElement, Props>(
    ({filter, categories, allEmojis, recentEmojis}: Props, ref = null) => {
        const categoryNamesArray = useMemo(() => {
            if (filter.length) {
                return ['searchResults'];
            }

            return Object.keys(categories);
        }, [filter, categories]);

        const categoriesAndEmojis = useMemo(() => {
            return categoryNamesArray.map((categoryName) => {
                const category = filter.length ? SEARCH_EMOJI_CATEGORY.searchResults : categories[categoryName as EmojiCategory];
                const emojis = getEmojisByCategory(
                    allEmojis,
                    categories,
                    category.name,
                    filter,
                    recentEmojis,
                );
                return {
                    [category.name]: emojis,
                };
            });
        }, [filter, categories, allEmojis, recentEmojis]);

        // when filter is applied, If there is only one category (search) and it is empty, show the no results indicator
        if (filter.length !== 0 && categoriesAndEmojis.length === 1) {
            const isCategorySearch =
                Object.keys(categoriesAndEmojis[0])[0] === 'searchResults';
            const isSearchEmpty =
                Object.values(categoriesAndEmojis[0])[0].length === 0;
            if (isCategorySearch && isSearchEmpty) {
                return (
                    <div>
                        <NoResultsIndicator
                            variant={NoResultsVariant.ChannelSearch}
                            titleValues={{channelName: `"${filter}"`}}
                        />
                    </div>
                );
            }
        }

        return (
            <div
                ref={ref}
                className='emoji-picker__items'
                style={{height: EMOJI_CONTAINER_HEIGHT, overflowY: 'hidden'}}
            >
                <div className='emoji-picker__container'>
                    {categoriesAndEmojis.map(
                        (categoryAndEmojis, categoryIndex) => {
                            const categoryName =
                                Object.keys(categoryAndEmojis)[0];
                            return (
                                <div key={categoryName}>
                                    <CategorySection
                                        categoryName={categoryName}
                                    />
                                    {Object.values(categoryAndEmojis)[0].map(
                                        (emoji, emojiIndex) => (
                                            <EmojiPickerItem
                                                // eslint-disable-next-line react/no-array-index-key
                                                key={
                                                    emoji.image +
                                                    ':' +
                                                    emojiIndex
                                                }
                                                emoji={emoji}

                                                // onItemOver={this.handleItemOver}
                                                // onItemClick={
                                                // this.handleItemClick
                                                // }
                                                category={emoji.category}

                                                // isSelected={cursor[0] === (categoryIndex) && cursor[1] === emojiIndex}
                                                categoryIndex={categoryIndex}
                                                emojiIndex={emojiIndex}

                                                // containerRef={this.emojiPickerContainerRef.current}
                                                // containerTop={this.state.divTopOffset}
                                                // containerBottom={this.state.divTopOffset + this.divHeight}
                                            />
                                        ),
                                    )}
                                </div>
                            );
                        },
                    )}
                </div>
            </div>
        );
    },
);

EmojiPickerCurrentResults.displayName = 'EmojiPickerCurrentResults';

export default memo(EmojiPickerCurrentResults);

function CategorySection({categoryName}) {
    return (
        <div className='emoji-picker-items__container'>
            <div
                className='emoji-picker__category-header'
                id={`emojipickercat-${categoryName}`}
            >
                <FormattedMessage id={`emoji_picker.${categoryName}`}/>
            </div>
        </div>
    );
}
