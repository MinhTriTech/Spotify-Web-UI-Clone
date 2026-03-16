import { Dropdown } from 'antd';
import { memo } from 'react';
import { useNavigate } from 'react-router-dom';

import { AddIcon, NewPlaylistIcon } from '../Icons';
import { useCreatePlaylist } from '../../hooks/queries/useCreatePlaylist';


export const AddPlaylistButton = memo(() => {
  const navigate = useNavigate();

  const { mutateAsync } = useCreatePlaylist(); 

  const onClick = async () => {
    const playlist = await mutateAsync({
      title: "Danh sách phát của tôi",
      description: "",
    });
    
    navigate(`/playlist/${playlist._id}`);
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
