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
import PlaylistCard from "../../components/playlist/PlaylistCard";

const HomePage = () => {
  const [playlists, setPlaylists] = useState([]); 

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
      <h1>Your Playlists</h1>

      <button onClick={handleCreate}>Create Playlist</button>

      {playlists.map((playlist) => (
        <PlaylistCard key={playlist._id} playlist={playlist} />
      ))}
    </div>
  );
};

export default HomePage;