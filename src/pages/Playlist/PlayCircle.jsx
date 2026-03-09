import { memo } from 'react';

export const PlayCircleButton = memo(({ size = 30 }) => {
  const playlist = [];
  const track = [];

  const context={ 
    id: playlist.playlist_id,
    image: playlist.image,
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
  else if (context && context.song_id) {
    isCurrent = currentTrack?.id === context.song_id;
  }
  

  if ( !track ) return null; 

  return (
    // <PlayCircle
    //   size={size}
    //   big={size >= 30}
    //   isCurrent={isCurrent}
    //   context={context}
    // />
    <div>Playcircle</div>
  );
});
