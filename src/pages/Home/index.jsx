import { useState } from "react";
import { Col, Row } from "antd";
import GridItemList from "../../components/Lists/GridItemList";
import { RandomTracks } from "./RandomTracks";
import { Spinner } from "../../components/spinner";
import { useRandomPlaylists } from "../../hooks/queries/useRandomPlaylists";
import { useRandomTracks } from "../../hooks/queries/useRandomTracks";
import { useRandomUsers } from "../../hooks/queries/useRandomUsers";

const HomePage = () => {
  const { data: playlists, isLoading: playlistLoading } = useRandomPlaylists();
  const { data: tracks, isLoading: trackLoading } = useRandomTracks();
  const { data: users, isLoading: userLoading } = useRandomUsers();

  const [color, setColor] = useState('rgb(66, 32, 35)');

  if (playlistLoading || trackLoading || userLoading) return <Spinner loading={playlistLoading || trackLoading || userLoading} />;

  return (
    <div>
      <div
        className="Home-seccion"
        style={{
          paddingTop: 0,
          transition: 'background 5s',
          background: `linear-gradient(180deg, ${color} 2%, rgb(18, 18, 18) 18%)`,
          marginBottom: 8
        }}
      >
        <Row gutter={[16, 16]}>
          <Col span={24}>
            <RandomTracks setColor={setColor} tracks={tracks}/>
          </Col> 

          <Col span={24}>
            <GridItemList title="Danh sách phát hôm nay" items={playlists}/>
          </Col> 

          <Col span={24}>
            <GridItemList title="Người dùng nổi bật" items={users}/>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;