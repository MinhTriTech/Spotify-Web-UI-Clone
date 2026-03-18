import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import tinycolor from "tinycolor2";

import { DEFAULT_PAGE_COLOR } from "../../constants/spotify";
import PlaylistHeader from "./PlaylistHeader";
import PlaylistList from "./PlaylistList";
import { getPlaylistById } from "../../services/playlist.service";
import { getImageAnalysis2 } from "../../utils/imageAnyliser"

const PlaylistDetail = ({ container }) => {
  const containerRef = useRef(null);

  const { id } = useParams();

  const [ tracks, setTracks] = useState([]);
  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

  const { data: playlist, isLoading } = useQuery({
    queryKey: ['playlist', id],
    queryFn: () => getPlaylistById(id),
    enabled: !!id,
  });

  const getTrackId = (trackItem) => {
    if (!trackItem) return null;
    if (typeof trackItem === 'string') return trackItem;
    if (trackItem?._id) return trackItem._id;

    if (trackItem?.track) {
      if (typeof trackItem.track === 'string') return trackItem.track;
      if (trackItem.track?._id) return trackItem.track._id;
    }

    return null;
  };

  const handleTrackRemoved = (removedTrackId) => {
    if (!removedTrackId) return;

    setTracks((prevTracks = []) =>
      prevTracks.filter((trackItem) => String(getTrackId(trackItem)) !== String(removedTrackId))
    );

  };

  useEffect(() => {
    setTracks(playlist?.tracks || []);
  }, [playlist]);

  useEffect(() => {
    const coverImage = playlist?.coverImage;

    if (coverImage) {
      const imageUrl = `${import.meta.env.VITE_URL}${coverImage}`;
      getImageAnalysis2(imageUrl).then((color) => {
        let item = tinycolor(color);
        while (item.isLight()) {
          item = item.darken(10);
        }
        setColor(item.toHexString());
      });
      return;
    }
    setColor(DEFAULT_PAGE_COLOR);
  }, [playlist]);

  if (isLoading || !playlist) return null;

  const playlistWithCurrentTracks = {
    ...playlist,
    tracks,
  };

  return (
    <div className="playlist-section">
      <PlaylistHeader color={color} playlist={playlistWithCurrentTracks} tracks={tracks} container={container} sectionContainer={containerRef}/>
      <PlaylistList color={color} playlist={playlistWithCurrentTracks} tracks={tracks} onTrackRemoved={handleTrackRemoved} />
    </div>
  );
};

export default PlaylistDetail;