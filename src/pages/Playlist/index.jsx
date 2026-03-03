// import { PlaylistList } from './table';
// import PlaylistHeader from './header';

// import { useParams } from 'react-router-dom';
// import { getImageAnalysis2 } from '../../utils/imageAnyliser';
// import { useEffect, useRef, useState } from 'react';

// import { playlistActions } from '../../store/slices/playlist';
// import { useAppDispatch, useAppSelector } from '../../store/store';

// import { DEFAULT_PAGE_COLOR } from '../../constants/spotify';
// import tinycolor from 'tinycolor2';

// const PlaylistView = ({ container }) => {
//   const dispatch = useAppDispatch();
//   const containerRef = useRef(null);
//   const { playlistId } = useParams();

//   const [color, setColor] = useState(DEFAULT_PAGE_COLOR);
//   const playlist = useAppSelector((state) => state.playlist.playlist);
  
//   useEffect(() => {
//     if (playlist && playlist.image) {
//       getImageAnalysis2(playlist.image).then((color) => {
//         let item = tinycolor(color);
//         while (item.isLight()) {
//           item = item.darken(10);
//         }
//         setColor(item.toHexString());
//       });
//     }
//   }, [playlist]);

//   useEffect(() => {
//     if (playlistId) {
//       dispatch(playlistActions.fetchPlaylist(playlistId));
//     }
//     return () => {
//       dispatch(playlistActions.setPlaylist({ playlist: null }));
//     };
//   }, [dispatch, playlistId]);

//   if (!playlist) return null;

//   return (
//     <div className="Playlist-section" ref={containerRef}>
//       <PlaylistHeader color={color} container={container} sectionContainer={containerRef} />
//       <PlaylistList color={color} />
//     </div>
//   );
// };

// PlaylistView.displayName = 'PlaylistView';

// export default PlaylistView;


import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getTracks } from "../../services/playlist.service";

const PlaylistDetail = () => {
  const { id } = useParams();
  const [ tracks, setTracks] = useState([]);

  useEffect(() => {
    fetchTracks();
  }, []);

  const fetchTracks = async () => {
    const data = await getTracks(id);
    setTracks(data);
  };

  return (
    <div>
      <h2>Playlist Detail</h2>

      {tracks.map((track) => (
        <div key={track._id}>
          <p>{track.title} - {track.artist}</p>
        </div>
      ))}
    </div>
  );
};

export default PlaylistDetail;