import { memo, useMemo } from 'react';
import { Dropdown, Modal } from 'antd';
import { DeleteIcon, EditIcon } from '../Icons';
import { useModal } from '../../context/ModalContext';
import { deletePlaylist } from '../../services/playlist.service';



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
            if (!playlistId) return;

            Modal.confirm({
              className: 'playlist-delete-confirm-modal',
              title: 'Xác nhận xóa playlist',
              content: `Bạn có chắc chắn muốn xóa playlist ${playlist?.title || ''}?`,
              okText: 'Xác nhận',
              cancelText: 'Hủy',
              okType: 'danger',
              onOk: async () => {
                await deletePlaylist(playlistId);
              },
            });
          },
        },
        {
          type: 'divider',
        }
      );
    return items;
  }, [openModal, playlistId, playlist?.title]);

  return (
    <Dropdown menu={{ items }} trigger={props.trigger}>
      {children}
    </Dropdown>
  );
});
