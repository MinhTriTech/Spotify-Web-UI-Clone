import { memo } from 'react';
import { PlayCircle } from '../../components/Lists/PlayCircle';
import { PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';
import { usePlayer } from '../../context/PlayerContext';

export const PlayCircleButton = memo(({ size = 30, playlistPlayCircle, tracksPlayCircle }) => {
  const playlist = playlistPlayCircle;
  const tracks = tracksPlayCircle;
  
  const { currentPlaylistId, currentIndex } = usePlayer();
  
  const context={ 
    id: playlist._id,
    image: playlist.image || PLAYLIST_DEFAULT_IMAGE,
    type: "playlist",
    title: playlist.title
  }

  let isCurrent = false;
  
  if (context && context.type === 'playlist' && context.id) {
    const isPlayingThisPlaylist = playlist.length > 0 && 
                                 currentIndex >= 0 && 
                                 currentPlaylistId === context.id;
    
    isCurrent = isPlayingThisPlaylist;
  } 
  
  if ( !tracks ) return null; 

  return (
    <PlayCircle
      size={size}
      big={size >= 30}
      isCurrent={isCurrent}
      context={context}
      tracksPlaylist={tracks}
      playlist={playlist}
    />
  );
});
