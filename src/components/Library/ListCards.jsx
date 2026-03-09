import { useNavigate } from 'react-router-dom';
import { memo } from 'react';

import { PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';

const Play = (
  <svg
    data-encore-id='icon'
    role='img'
    width={26}
    height={26}
    fill='white'
    aria-hidden='true'
    className='Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq'
    viewBox='0 0 24 24'
  >
    <path d='m7.05 3.606 13.49 7.788a.7.7 0 0 1 0 1.212L7.05 20.394A.7.7 0 0 1 6 19.788V4.212a.7.7 0 0 1 1.05-.606z'></path>
  </svg>
);

const Pause = (
  <svg
    data-encore-id='icon'
    role='img'
    width={26}
    height={26}
    fill='white'
    aria-hidden='true'
    className='Svg-sc-ytk21e-0 bneLcE zOsKPnD_9x3KJqQCSmAq'
    viewBox='0 0 24 24'
  >
    <path d='M5.7 3a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7H5.7zm10 0a.7.7 0 0 0-.7.7v16.6a.7.7 0 0 0 .7.7h2.6a.7.7 0 0 0 .7-.7V3.7a.7.7 0 0 0-.7-.7h-2.6z'></path>
  </svg>
);

const Card = memo((props) => {
  const { title, image, subtitle, onClick } = props;

  return (
    <div
      onClick={onClick}
      role="button"
      tabIndex={0}
      className="library-card"
      style={{ borderRadius: 10 }}
    >
      <div className={`image p-2 h-full items-center ${props.rounded ? 'rounded' : ''}`}>
        <div style={{ position: 'relative' }}>
          <img
            src={image}
            alt="playlist cover"
            className="rounded-md"
            style={{ width: 52, height: 52 }}
          />
          <button className="image-button">
            {Play}
          </button>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          width: '100%',
        }}
      >
        <div id="playlist-song-and-artist-name">
          <h3
            className="text-md font-semibold text-white"
            style={{
              fontSize: 15,
              marginBottom: -5,
              color: undefined,
              fontWeight: 100,
            }}
          >
            {title}
          </h3>

          <p
            className="text-md font-semibold text-white"
            style={{
              fontSize: 13,
              opacity: 0.7,
              fontWeight: 400,
            }}
          >
            {subtitle}
          </p>
        </div>
      </div>
    </div>
  );
});

const PlaylistCard = memo(({ playlist }) => {
  const navigate = useNavigate();
  console.log(playlist);
  

  const onClick = () => {
    navigate(`/playlist/${playlist._id}`);
  };

  return (
    <Card
      onClick={onClick}
      title={playlist.title}
      image={playlist.image ? playlist.image : PLAYLIST_DEFAULT_IMAGE}
      subtitle={playlist.description}
    />
  );
});

export const ListItemComponent = ({ item }) => {
  return <PlaylistCard playlist={item} />;
};
