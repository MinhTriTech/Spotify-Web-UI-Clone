import { Col, Modal, Row } from 'antd';
import { memo, useEffect, useRef, useState } from 'react';
import ProForm, { ProFormText } from '@ant-design/pro-form';
import { useQueryClient } from '@tanstack/react-query';

import { PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';
import { getPlaylistById, updatePlaylist } from '../../services/playlist.service';
import { useParams } from 'react-router-dom';

const EditPlaylistModal = memo(({ playlistId, onClose }) => {
  const formRef = useRef(null);
  const queryClient = useQueryClient();
  const { id: routeId } = useParams();
  const id = playlistId || routeId;

  const [playlist, setPlaylist] = useState(null);


  const [file, setFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [loading, setLoading] = useState(false);


  function handleChange(e) {
    if (!e.target.files.length) {
      setFileUrl('');
      setFile(null);
      return;
    }
    const url = URL.createObjectURL(e.target.files[0]);
    setFileUrl(url);
    setFile(e.target.files[0]);
  }

  useEffect(() => {
    const fetchPlaylist = async () => {
      if (!id) return;
      try {
        const playlistData = await getPlaylistById(id);
        setPlaylist(playlistData);
        formRef.current?.setFieldsValue({ title: playlistData?.title });
      } catch (error) {
        console.log(error);
      }
    };

    fetchPlaylist();
  }, [id]);

  return (
    <Modal
      centered
      width={550}
      footer={null}
      open
      onCancel={onClose}
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
          Chỉnh sửa thông tin
        </h1>
      }
    >
      <ProForm
        formRef={formRef}
        style={{ marginTop: 10 }}
        onFinish={async (values) => {
          try {
            if (!id) return false;

            setLoading(true);
            const formData = new FormData();

            formData.append("title", values.title);
            if (file) {
              formData.append("coverImage", file);
            }

            await updatePlaylist(id, formData);
            await Promise.all([
              queryClient.invalidateQueries({ queryKey: ['myPlaylists'] }),
              queryClient.invalidateQueries({ queryKey: ['playlist', id] }),
            ]);
            onClose?.();
          } catch (error) {
            console.log(error);
          } finally {
            setLoading(false);
          }
        }}
        submitter={{
          render: (props) => (
            <div style={{ textAlign: 'right' }}>
              <button
                disabled={loading}
                className="edit-playlist-submit-button"
                onClick={props.submit || props.onSubmit}
              >
                <span>Lưu</span>
              </button>
            </div>
          ),
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={8}>
            <div className='playlist-img-container'>
              <div className='playlist-img-overlay'>
                <div className='playlist-img-overlay-container'>
                  <button aria-haspopup='true'>
                    <div className='icon'>
                      <svg
                        data-encore-id='icon'
                        role='img'
                        height={50}
                        width={50}
                        aria-hidden='true'
                        viewBox='0 0 24 24'
                        style={{ margin: '0 auto' }}
                      >
                        <path d='M17.318 1.975a3.329 3.329 0 1 1 4.707 4.707L8.451 20.256c-.49.49-1.082.867-1.735 1.103L2.34 22.94a1 1 0 0 1-1.28-1.28l1.581-4.376a4.726 4.726 0 0 1 1.103-1.735L17.318 1.975zm3.293 1.414a1.329 1.329 0 0 0-1.88 0L5.159 16.963c-.283.283-.5.624-.636 1l-.857 2.372 2.371-.857a2.726 2.726 0 0 0 1.001-.636L20.611 5.268a1.329 1.329 0 0 0 0-1.879z'></path>
                      </svg>
                      <span data-encore-id='text'>Chọn ảnh</span>
                    </div>
                  </button>
                  <input type='file' onChange={handleChange} accept='image/.jpg, image/.jpeg' />
                </div>
              </div>
              <img
                src={
                  fileUrl
                    ? fileUrl
                    : playlist?.coverImage
                    ? `${import.meta.env.VITE_URL}${playlist.coverImage}` 
                    : PLAYLIST_DEFAULT_IMAGE
                }
                className='playlist-img'
              />
            </div>
          </Col>
          <Col span={16}>
            <ProFormText
              placeholder='Thêm tên playlist'
              name='title'
              rules={[{ required: true, message: '' }]}
            />
          </Col>
        </Row>
      </ProForm>
    </Modal>
  );
});

export default EditPlaylistModal;
