import { Col, Row } from 'antd';
import { HorizontalCard } from './HorizontalCard';

export const RandomTracks = (props) => {
    const { tracks } = props; 

    if (!tracks || !tracks.length) return null;
  
  return (
    <Row
      gutter={[16, 16]}
      style={{ margin: '20px 0px', marginTop: '20px' }}
      justify="space-between"
    >
      {tracks.slice(0, undefined).map((item, index) => (
        <Col key={item.id || item.song_id || index} xs={24} md={12} lg={6}>
          <HorizontalCard item={item} setColor={props.setColor} />
        </Col>
      ))}
    </Row>
  );
};
