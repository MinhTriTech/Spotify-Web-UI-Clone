import { useState } from "react";
import { Col, Row } from "antd";
import GridItemList from "../../components/Lists/GridItemList";
import { RandomTracks } from "./RandomTracks";
import { Spinner } from "../../components/spinner";
import { useRandomPlaylists } from "../../hooks/queries/useRandomPlaylists";
import { useRandomTracks } from "../../hooks/queries/useRandomTracks";

const HomePage = () => {
  const { data: playlists, isLoading: playlistLoading } = useRandomPlaylists();
  const { data: tracks, isLoading: trackLoading } = useRandomTracks();

  const [color, setColor] = useState('rgb(66, 32, 35)');

  if (playlistLoading || trackLoading) return <Spinner loading={playlistLoading || trackLoading} />;

  return (
    <div>
      <div
        className="Home-seccion"
        style={{
          paddingTop: 0,
          transition: 'background 5s',
          background: `linear-gradient(180deg, ${color} 2%, rgb(18, 18, 18) 18%)`,
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <RandomTracks setColor={setColor} tracks={tracks}/>
          </Col>

          <Col span={24}>
            <GridItemList title="Danh sách 1" items={playlists}/>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;