import { Modal } from 'antd';
import { memo, useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { deletePlaylist } from '../../services/playlist.service';
import { useNavigate } from 'react-router-dom';

const DeletePlaylistModal = memo(({ playlist, onClose }) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    if (playlist) {
      try {
        setIsDeleting(true);
        const playlistId = playlist?._id || playlist?.playlist_id || playlist?.id;
        if (!playlistId) return;

        await deletePlaylist(playlistId);

        onClose?.();
        navigate('/home', { replace: true });

        queryClient.invalidateQueries({ queryKey: ['myPlaylists'] });
        queryClient.removeQueries({ queryKey: ['playlist', String(playlistId)] });
      } catch (error) {
        console.error("Failed to delete playlist", error);
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Modal
      centered
      width={550}
      footer={null}
      open
      confirmLoading={isDeleting}
      onCancel={() => {
        if (isDeleting) return;
        onClose?.();
      }}
      title={
        <h1
          style={{
            fontWeight: 700,
            fontSize: '1.5rem',
            marginBlockStart: 0,
            paddingBlockEnd: 8,
            color: 'white',
          }}
        >
          Xóa Playlist ?
        </h1>
      }
    >
      <p style={{ color: '#fff' }}>
        Bạn chắc chắn muốn xóa Playlist {playlist?.title} khỏi Thư viện của bạn không?
      </p>

      <div style={{ textAlign: 'right' }}>
      <button
        disabled={isDeleting}
        onClick={handleDelete}
        className='edit-playlist-submit-button'
        >
        <span>{isDeleting ? 'Đang xóa...' : 'Xác nhận'}</span>
        </button>
      </div>
    </Modal>
  );
});

DeletePlaylistModal.displayName = 'DeletePlaylistModal';

export default DeletePlaylistModal;
