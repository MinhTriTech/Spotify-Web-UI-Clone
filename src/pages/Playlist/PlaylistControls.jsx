import { Col, Row, Space, Tooltip } from 'antd';

import { PlayCircleButton } from './PlayCircle';
import { MenuDots } from '../../components/Icons';
import { PlayListActionsWrapper } from '../../components/Actions/PlaylistActions';

const PlaylistControls = ({playlist, tracks}) => {
  const isMine = true;

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
