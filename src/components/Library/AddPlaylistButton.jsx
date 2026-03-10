import { Dropdown } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddIcon, NewPlaylistIcon } from '../Icons';
import { createPlaylist } from '../../services/playlist.service';


export const AddPlaylistButton = memo(() => {
  const navigate = useNavigate();

  const onClick = async () => {
    try {
      const playlist = await createPlaylist({
        title: "Danh sách phát của tôi",
        description: "",
      });

      // Dispatch event để refresh playlist list
      window.dispatchEvent(new CustomEvent('playlist-created'));
      
      navigate(`/playlist/${playlist._id}`);
    } catch (error) {
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
