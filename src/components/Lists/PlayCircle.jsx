import { useCallback, useMemo } from 'react';
import { usePlayer } from '../../context/PlayerContext';

export const PlayCircle = ({ size = 20, big, isCurrent, context, tracksPlaylist, playlist }) => {

  const { isPlaying, currentPlaylist, playTrack, pauseTrack, currentTrack } = usePlayer();

  // Tính toán type từ context thay vì dùng state
  const isPlaylist = context?.type === "playlist";
  const isTrack = context?.audioUrl ? true : false;
    
  // Sử dụng useMemo để cache kết quả, tránh gọi nhiều lần trong render
  const isThisPlaying = useMemo(() => {
    if (!isPlaying || !context) return false;
    
    if (context.type === "playlist") {
      return context.id === currentPlaylist;
    } else if (context?.audioUrl ? true : false) {
      return context._id === currentTrack?._id;
    }
    
    return false;
  }, [isPlaying, context, currentPlaylist, currentTrack]);
    
  const onClick = useCallback(
    async (e) => {
      if (e?.stopPropagation) e.stopPropagation();

      if (isPlaylist && isCurrent) {
        isThisPlaying ? pauseTrack() : playTrack();
        return;
      }

      if (isTrack && isCurrent) {
        isThisPlaying ? pauseTrack() : playTrack(context);
        return;
      }

      if (isPlaylist && context?.id) {
        const tracks = tracksPlaylist;

        if (tracks && tracks.length > 0) {
          playTrack(tracks[0], tracks, playlist._id);
        }
      } else if (isTrack) {
        playTrack(context);
      }
    },
    [
      context,
      isPlaylist,
      isTrack,
      isCurrent,
      isThisPlaying,
      tracksPlaylist,
      playlist,
      playTrack,
      pauseTrack,
    ]   
  );

  return (
    <button
      onClick={onClick}
      className={`${big ? 'circle-play big' : 'circle-play'} 
      ${isThisPlaying ? 'active' : ''}`}
    >
      <span>
        {!isThisPlaying ? (
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
