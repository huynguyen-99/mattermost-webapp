// Copyright (c) 2015-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.

import React from 'react';
import {render} from '@testing-library/react';
import {IntlProvider} from 'react-intl';

import en from 'i18n/en.json';

import EmojiPickerSearch from 'components/emoji_picker/components/emoji_picker_search';

jest.mock('components/emoji_picker/components/emoji_picker_skin', () => () => <div/>);

const baseProps = {
    filter: '',
    userSkinTone: 'default',
    onChange: jest.fn(),
    onKeyDown: jest.fn(),
    onSkinChange: () => jest.fn(),
};

test('should match snapshot', () => {
    const {container} = render(
        <IntlProvider
            locale='en'
            messages={en}
        >
            <EmojiPickerSearch {...baseProps}/>
        </IntlProvider>,
    );

    expect(container).toMatchSnapshot();
});
