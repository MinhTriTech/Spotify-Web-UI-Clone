import { useNavigate, useParams } from 'react-router-dom';
import { memo } from 'react';

import { PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';

const Card = memo((props) => {
  const { title, image, subtitle, onClick, isActive } = props;

  return (
    <div
      onClick={onClick}
      data-active={isActive}
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
  const { id } = useParams();
  const navigate = useNavigate();
  const isActive = String(id) === String(playlist?._id);

  const onClick = () => {
    navigate(`/playlist/${playlist._id}`);
  };

  return (
    <Card
      onClick={onClick}
      title={playlist.title}
      image={playlist.coverImage ? `${import.meta.env.VITE_URL}${playlist.coverImage}`  : PLAYLIST_DEFAULT_IMAGE}
      subtitle={playlist.description}
      isActive={isActive}
    />
  );
});

export const ListItemComponent = ({ item }) => {
  return <PlaylistCard playlist={item} />;
};
