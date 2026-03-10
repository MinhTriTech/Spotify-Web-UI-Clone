import { useCallback } from 'react';
import { usePlayer } from '../../context/PlayerContext';

export const PlayCircle = ({ size = 20, big, isCurrent, context, tracksPlaylist, playlist }) => {

  const { 
      isPlaying, currentPlaylist, playTrack, pauseTrack
    } = usePlayer();
  
  const isThisTrackPlaying = useCallback(() => {
    if (!isPlaying || !context) return false;
  
    if (context.type === "playlist") {
      return context.id === currentPlaylist;
    }
  
    return false;
  }, [isPlaying, context, currentPlaylist]);

  const isPlaylist = true;

  const onClick = useCallback(
      async (e) => {
        if (e?.stopPropagation) e.stopPropagation();

        if (isPlaylist && isCurrent) {
          isThisTrackPlaying() ? pauseTrack() : playTrack();
          return;
        }
  
        if (isPlaylist && context?.id) {
          const tracks = tracksPlaylist;
  
          if (tracks && tracks.length > 0) {
            playTrack(tracks[0], tracks, playlist._id);
          }
        }
      },
      [
        context,
        isPlaylist,
        isCurrent,
        isThisTrackPlaying,
      ]   
    );

  return (
    <button
      onClick={onClick}
      className={`${big ? 'circle-play big' : 'circle-play'} 
      ${isThisTrackPlaying() ? 'active' : ''}`}
    >
      <span>
        {!isThisTrackPlaying() ? (
          <svg
          style={{ height: size }}
          data-encore-id='icon'
          role='img'
          aria-hidden='true'
          viewBox='0 0 16 16'
        >
          <path d='M3 1.713a.7.7 0 0 1 1.05-.607l10.89 6.288a.7.7 0 0 1 0 1.212L4.05 14.894A.7.7 0 0 1 3 14.288V1.713z'></path>
        </svg>
        ) : (
          <svg
            style={{ height: size }}
            data-encore-id='icon'
            role='img'
            aria-hidden='true'
            viewBox='0 0 24 24'
          >
            <path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
          </svg>
        )}
      </span>
    </button>
  );
};
