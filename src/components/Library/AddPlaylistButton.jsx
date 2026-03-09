import { Dropdown, message } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddIcon, NewPlaylistIcon } from '../Icons';


export const AddPlaylistButton = memo(() => {
  const navigate = useNavigate();
  const user = true;

  const onClick = async () => {
    if (!user) return dispatch(uiActions.openLoginTooltip());
  
    try {
      const playlist = await playlistService.createPlaylist('Danh sách phát của tôi');
      message.success('Tạo danh sách phát thành công');
      dispatch(fetchMyPlaylists());
      navigate(`/playlist/${playlist.playlist_id}`);
    } catch (error) {
      message.error('Không thể tạo danh sách phát. Vui lòng thử lại sau.');
      console.error(error);
    }
  };

  return (
    <Dropdown
      placement='bottomRight'
      trigger={['click']}
      menu={{
        items: [
          {
            key: 'create',
            icon: <NewPlaylistIcon />,
            label: 'Tạo danh sách phát mới',
            onClick,
          },
        ],
      }}
    >
      <button className='addButton'>
        <AddIcon />
      </button>
    </Dropdown>
  );
});
