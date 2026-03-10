import { Col, Row, Space } from 'antd';

import { PlayCircleButton } from './PlayCircle';

const PlaylistControls = ({playlist, tracks}) => {
  return (
    <div className='playlist-controls'>
      <Row justify='space-between' align='middle'>
        <Col>
          <Space align='center'>
            <PlayCircleButton playlistPlayCircle={playlist} tracksPlayCircle={tracks}/>
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
