import { memo } from 'react';
import { Flex, Space } from 'antd';

import { AddPlaylistButton } from './AddPlaylistButton';
import { LibraryIcon } from '../Icons';

export const LibraryTitle = memo(() => {
    return (
        <Flex align='center' justify='space-between'>
            <Space wrap align='center'>
                <LibraryIcon />
                <span className='Navigation-button'>Thư viện của bạn</span>
            </Space>

            <AddPlaylistButton />
        </Flex>
    );
});
