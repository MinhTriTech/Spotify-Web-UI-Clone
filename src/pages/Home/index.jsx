import { useEffect, useState } from "react";
import { getPlaylists } from "../../services/playlist.service";
import { Col, Row } from "antd";
import GridItemList from "../../components/Lists/GridItemList";
import { RandomTracks } from "./RandomTracks";
import { getRandomTrack } from "../../services/track.service";

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]); 
  const [randomTracks, setRandomTracks] = useState([]); 

  const [color, setColor] = useState('rgb(66, 32, 35)');

  useEffect(() => {
    fetchRandomTracks();
    fetchPlaylists();
  }, []);

  const fetchRandomTracks = async () => {
    try {
      const data = await getRandomTrack();
      setRandomTracks(data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchPlaylists = async () => {
    try {
      const data = await getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <RandomTracks setColor={setColor} tracks={randomTracks}/>
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