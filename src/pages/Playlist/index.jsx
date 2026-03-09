import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { DEFAULT_PAGE_COLOR } from "../../constants/spotify";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistList from "./PlaylistList";
import { getPlaylistById } from "../../services/playlist.service";
import { getImageAnalysis2 } from "../../utils/imageAnyliser"

const PlaylistDetail = ({ container }) => {
  const containerRef = useRef(null);

  const { id } = useParams();

  const [ playlist, setPlaylist] = useState([]);
  const [ tracks, setTracks] = useState([]);
  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

  const getPlaylist = async () => {
    const { playlist, tracks} = await getPlaylistById(id);
    setPlaylist(playlist);
    setTracks(tracks);
  };

  useEffect(() => {
    if (id) {
      getPlaylist();
    }
    return () => {
      setPlaylist(null);
      setTracks(null);
    };
  }, [id]);

  useEffect(() => {
    if (playlist && playlist.image) {
      getImageAnalysis2(playlist.image).then((color) => {
        let item = tinycolor(color);
        while (item.isLight()) {
          item = item.darken(10);
        }
        setColor(item.toHexString());
      });
    }
  }, [playlist]);

  if (!playlist) return null;

  return (
    <div className="playlist-section">
      <PlaylistHeader color={color} playlist={playlist} tracks={tracks} container={container} sectionContainer={containerRef}/>
      <PlaylistList color={color} tracks={tracks}/>
    </div>
  );
};

export default PlaylistDetail;