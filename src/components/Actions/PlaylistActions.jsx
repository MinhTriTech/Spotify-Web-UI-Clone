import { memo, useMemo } from 'react';
import { Dropdown } from 'antd';
import { DeleteIcon, EditIcon } from '../Icons';
import { useModal } from '../../context/ModalContext';



export const PlayListActionsWrapper = memo((props) => {
  const { children, playlist } = props;

  const { openModal } = useModal();
  const playlistId = playlist?._id || playlist?.playlist_id || playlist?.id;

  const items = useMemo(() => {
    const items = [];

    items.push(
        {
          label: 'Chỉnh sửa thông tin',
          key: 1,
          icon: <EditIcon />,
          onClick: () => {
            if (!playlistId) return;
            openModal('updatePlaylist', { playlistId });
          },
        },
        {
          label: 'Xóa danh sách phát',
          key: '2',
          icon: <DeleteIcon />,
          onClick: () => {

          },
        },
        {
          type: 'divider',
        }
      );
    return items;
  }, [openModal, playlistId]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});
