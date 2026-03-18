import { Col, Row, Space, Tooltip } from 'antd';

import { PlayCircleButton } from './PlayCircle';
import { MenuDots } from '../../components/Icons';
import { PlayListActionsWrapper } from '../../components/Actions/PlaylistActions';
import { useAuth } from '../../context/AuthContext';

const PlaylistControls = ({playlist, tracks}) => {
  const { user } = useAuth();

  const ownerId = playlist?.owner?._id || playlist?.owner?.id || playlist?.owner;
  const currentUserId = user?.user?._id || user?._id || user?.id;
  const isMine = Boolean(ownerId && currentUserId && String(ownerId) === String(currentUserId));

  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space align='center'>
            <PlayCircleButton playlistPlayCircle={playlist} tracksPlayCircle={tracks}/>

            {isMine ? (
              <PlayListActionsWrapper
                playlist={playlist}
                trigger={['click']}
                onRefresh={() => {
                  
                }}
              >
                <Tooltip title={`Tùy chọn khác cho ${playlist?.title}`}>
                  <div className="scale">
                    <MenuDots />
                  </div>
                </Tooltip>
              </PlayListActionsWrapper>
            ) : null}
          </Space>
        </Col>
        <Col>
          <Space className='mobile-hidden'>
          </Space>
        </Col>
      </Row>
    </div>
  );
};

export default PlaylistControls;
