import { useNavigate } from 'react-router-dom';
import { ARTISTS_DEFAULT_IMAGE, PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';

const Card = ({ title, image, rounded, description, onClick }) => {
  return (
    <div
      onClick={onClick}
      style={{ cursor: 'pointer' }}
      className='playlist-card relative rounded-lg overflow-hidden hover:bg-spotify-gray-lightest transition'
    >
      <div
        style={{ position: 'relative' }}
        className='aspect-square md:aspect-w-1 md:aspect-h-1/2 lg:aspect-w-1 lg:aspect-h-3/4 xl:aspect-w-1 xl:aspect-h-4/5 p-4'
      >
        <img
          src={image}
          alt={title}
          className={rounded ? 'rounded' : ''}
          style={{ borderRadius: 5, width: '100%' }}
        />
        <div
          className={'circle-play-div transition translate-y-1/4'}
        >
        </div>
      </div>
      <div className='playlist-card-info'>
        <h3 className='text-md font-semibold text-white'>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
};

export const TrackCard = ({ item }) => {
  const navigate = useNavigate();

  return (
    <Card
      title={item.title}
      image={item.image ? item.image : PLAYLIST_DEFAULT_IMAGE}
      onClick={() => navigate(`/playlist/${item._id}`)}
    />
  );
};

export const ArtistCard = ({ item, onClick }) => {

  const navigate = useNavigate();

  return (
    <div onClick={onClick}>
      <Card
        rounded
        title={item.username}
        image={ARTISTS_DEFAULT_IMAGE}
        context={{ 
          type: "user",
        }}
        onClick={() => navigate(`/user/${item._id}`)}
      />
    </div>
  );
};



