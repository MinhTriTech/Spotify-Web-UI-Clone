import { Tooltip } from 'antd';
import { Link } from 'react-router-dom';
import { useCallback, useMemo } from 'react';

import { MenuIcon, Pause, Play } from '../Icons';
import { EQUILISER_IMAGE } from '../../constants/spotify';

import { usePlayer } from '../../context/PlayerContext';
import TrackActionsWrapper from '../Actions/TrackActions';

const getArtists = (artists) => {
  return (
    <span>
      {/* <ArtistActionsWrapper artist={a} trigger={['contextMenu']}> */}
        <Link to={`/artist/1`} style={{ cursor: 'pointer' }}>
          {artists}
        </Link>
      {/* </ArtistActionsWrapper> */}
    </span>
  );
};

const Title = (props) => {
  const { song, isList, isCurrent } = props;

  return (
    <>
      <div className='flex flex-col' style={{ flex: 8 }}>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className='flex flex-row items-center'>
              <p className={`title text-left ${isCurrent ? 'active' : ''}`}>
                <span>{song.title}</span>{' '}
              </p>
            </div>

            {isList ? (
              <p className='text-left artist mobile-hidden'>
                {song.explicit ? <span className='explicit'>18+</span> : null}
                {getArtists(song.artist)}
              </p>
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};

const Cover = ({ song, isList }) => {
  if (!isList) return null;

  const imageUrl = song?.image;
  if (!imageUrl) return null;

  return (
    <img alt='Bìa bài hát' src={song?.image} className='w-10 h-10 mr-4 rounded-md' />
  );
};

const TitleWithCover = (props) => {
  
  const { song, isList, isCurrent } = props;
  
  return (
    <div className='flex flex-col' style={{ flex: 8 }}>
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <Cover {...props} />
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div className='flex flex-row items-center'>
            <p className={`title text-left ${isCurrent ? 'active' : ''}`}>
              <span>{song.title}</span>{' '}
            </p>
          </div>
          {isList ? (
            <p className='text-left artist mobile-hidden'>
              {getArtists(song.artist)}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
};

const Artists = ({ song, isList }) => {
  if (isList) return null;
  return (
    <p className='text-left tablet-hidden' style={{ flex: 5 }}>
      {getArtists(song.artist)}
    </p>
  );
};

const Actions = ({ song }) => {
  return (
    <div className='text-right actions tablet-hidden' style={{ flex: 1, display: 'flex', justifyContent: 'center' }}>
      <TrackActionsWrapper canEdit={true} track={song} trigger={['click']}>
        <Tooltip title={`Tùy chọn khác cho ${song.title}`}>
          <div>
            <MenuIcon />
          </div>
        </Tooltip>
      </TrackActionsWrapper>
    </div>
  );
};

const Index = ({ index, isCurrent, isPlaying, onClick }) => {
  return (
    <div style={{ flex: 1 }} className='mobile-hidden'>
      <p className='song-details-index'>
        {isCurrent && isPlaying ? (
          <img alt='equaliser' style={{ height: 10, margin: '0 auto' }} src={EQUILISER_IMAGE} />
        ) : (
          <span style={{ margin: '0 auto' }}>{index + 1}</span>
        )}
      </p>
      <div
        className='song-details-play'
        role='button'
        tabIndex={0}
        onClick={onClick}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            onClick();
          }
        }}
      >
        {isCurrent && isPlaying ? <Pause /> : <Play />}
      </div>
    </div>
  );
};

export const SongView = (props) => {
  const { size = 'normal' } = props;
  const { activable, view, song, index, artist, fields, canEdit } = props; 
  const { currentTrack, playTrack, isPlaying, pauseTrack } = usePlayer();

  const isCurrent = useMemo(() => {
    return song && song._id && currentTrack?._id === song._id;
  }, [song, currentTrack]);
  
  const selectedView = view;
  const isList = selectedView === 'LIST';

  const isThisTrackPlaying = useCallback(() => {
    if (!isPlaying || !song) return false;
  
    if (song.audioUrl && currentTrack?._id) {
      return song._id === currentTrack._id;
    }
  
    return false;
  }, [isPlaying, song, currentTrack]);

  const onClick = useCallback(() => {
    if (!isCurrent) {
      playTrack(song);
    } else {
      isThisTrackPlaying() ? pauseTrack() : playTrack(song);
    }
  }, [currentTrack, isThisTrackPlaying]);

  return (
      <button
        className={`flex flex-col w-full hover:bg-spotify-gray-lightest items-center ${
          size === 'normal' ? 'p-2' : ''
        } rounded-lg ${activable ? 'activable-song' : ''}`}
      >
        <div className='song-details flex flex-row items-center w-full'>
          <div className='flex flex-row items-center justify-between w-full'>
            {index !== undefined ? (
              <Index index={index} onClick={onClick} isCurrent={isCurrent} isPlaying={isPlaying} />
            ) : null}
            {fields.map((Field, i) => (
              <Field
                key={i}
                isList={isList}
                onPlay={onClick}
                isCurrent={isCurrent}
                isPlaying={isPlaying}
                {...props}
              />
            ))}
          </div>
        </div>
      </button>
  );
};

export default SongView;

export const SongViewComponents = {
  Title,
  TitleWithCover,
  Artists,
  Cover,
  Actions,
};
