// import { memo, useEffect } from 'react';

// import HomePageContainer from './container';

// import { homeActions } from '../../store/slices/home';
// import { useAppDispatch, useAppSelector } from '../../store/store';

// const Home = memo((props) => {
//   const { container } = props;

//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => !!state.auth.user);
//   useEffect(() => {
//     if (user) {
//       dispatch(homeActions.fetchTopTracks());
//     }
//     dispatch(homeActions.fecthFeaturedPlaylists());
//     dispatch(homeActions.fecthArtists());
//   }, [user, dispatch]);

//   return <HomePageContainer container={container} />;
// });

// export default Home;

import { useEffect, useState } from "react";
import { getPlaylists, createPlaylist } from "../../services/playlist.service";
import { Col, Row } from "antd";
import GridItemList from "../../components/Lists/GridItemList";

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]); 
  const [color, setColor] = useState('rgb(66, 32, 35)');

  useEffect(() => {
    fetchPlaylists();
  }, []);

  const fetchPlaylists = async () => {
    try {
      const data = await getPlaylists();
      setPlaylists(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreate = async () => {
    await createPlaylist({
      title: "My Playlist",
      description: "First playlist",
    });

    fetchPlaylists();
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
            <GridItemList title="Danh sách 1" items={playlists}/>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HomePage;