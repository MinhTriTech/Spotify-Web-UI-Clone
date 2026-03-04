import { Flex } from 'antd';
import { Link } from 'react-router-dom';
import { TrackCard, ArtistCard, AlbumCard } from '../Lists/GridCards';

// Mock data cho component - bao gồm tất cả các loại items
const mockItems = {
  playlists: [
    {
      playlist_id: 1,
      id: 1,
      name: "Today's Top Hits",
      title: "Today's Top Hits",
      description: 'The hottest tracks right now',
      image: 'https://i.scdn.co/image/ab67706f00000002724554ed6bed6f051d9b0bfc',
      total_tracks: 50,
      owner: { name: 'Spotify' },
    },
    {
      playlist_id: 2,
      id: 2,
      name: 'RapCaviar',
      title: 'RapCaviar',
      description: 'New music from top artists',
      image: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112',
      total_tracks: 50,
      owner: { name: 'Spotify' },
    },
    {
      playlist_id: 3,
      id: 3,
      name: 'Chill Hits',
      title: 'Chill Hits',
      description: 'Kick back to the best chill hits',
      image: 'https://i.scdn.co/image/ab67706f00000002a3f02281e676f1ccda3862f6',
      total_tracks: 150,
      owner: { name: 'Spotify' },
    },
  ],
  artists: [
    {
      artist_id: 1,
      id: 1,
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
      bio: 'Canadian singer, songwriter, and producer',
      followers: 95000000,
      verified: true,
    },
    {
      artist_id: 2,
      id: 2,
      name: 'Taylor Swift',
      image: 'https://i.scdn.co/image/ab6761610000e5eb859e4c14fa59296c8649e0e4',
      bio: 'American singer-songwriter',
      followers: 92000000,
      verified: true,
    },
    {
      artist_id: 3,
      id: 3,
      name: 'Drake',
      image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9',
      bio: 'Canadian rapper and singer',
      followers: 78000000,
      verified: true,
    },
  ],
  albums: [
    {
      album_id: 1,
      id: 1,
      name: 'After Hours',
      title: 'After Hours',
      image: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
      release_date: '2020-03-20',
      total_tracks: 14,
      type: 'album',
      artist_id: {
        id: 1,
        name: 'The Weeknd',
        image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
      },
      artists: [{ id: 1, name: 'The Weeknd' }],
    },
    {
      album_id: 2,
      id: 2,
      name: 'Midnights',
      title: 'Midnights',
      image: 'https://i.scdn.co/image/ab67616d0000b273e0b60c608586d6f4a9e63865',
      release_date: '2022-10-21',
      total_tracks: 13,
      type: 'album',
      artist_id: {
        id: 2,
        name: 'Taylor Swift',
        image: 'https://i.scdn.co/image/ab6761610000e5eb859e4c14fa59296c8649e0e4',
      },
      artists: [{ id: 2, name: 'Taylor Swift' }],
    },
    {
      album_id: 3,
      id: 3,
      name: 'Views',
      title: 'Views',
      image: 'https://i.scdn.co/image/ab67616d0000b273f46b9d202509a8f7384b90de',
      release_date: '2016-04-29',
      total_tracks: 20,
      type: 'album',
      artist_id: {
        id: 3,
        name: 'Drake',
        image: 'https://i.scdn.co/image/ab6761610000e5eb4293385d324db8558179afd9',
      },
      artists: [{ id: 3, name: 'Drake' }],
    },
  ],
  users: [
    {
      id: 100,
      user_id: 100,
      username: 'music_lover',
      display_name: 'Music Lover',
      email: 'user@example.com',
      image: 'https://i.pravatar.cc/300?img=1',
      followers: 120,
      following: 85,
    },
    {
      id: 101,
      user_id: 101,
      username: 'admin',
      display_name: 'Admin User',
      email: 'admin@example.com',
      image: 'https://i.pravatar.cc/300?img=2',
      followers: 5000,
      following: 200,
    },
    {
      id: 102,
      user_id: 102,
      username: 'jane_doe',
      display_name: 'Jane Doe',
      email: 'jane@example.com',
      image: 'https://i.pravatar.cc/300?img=5',
      followers: 250,
      following: 150,
    },
  ],
  mixed: [
    {
      playlist_id: 1,
      id: 'playlist-1',
      name: "Today's Top Hits",
      title: "Today's Top Hits",
      description: 'The hottest tracks right now',
      image: 'https://i.scdn.co/image/ab67706f00000002724554ed6bed6f051d9b0bfc',
      total_tracks: 50,
      owner: { name: 'Spotify' },
    },
    {
      artist_id: 1,
      id: 'artist-1',
      name: 'The Weeknd',
      image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
      bio: 'Canadian singer, songwriter, and producer',
      followers: 95000000,
      verified: true,
    },
    {
      album_id: 1,
      id: 'album-1',
      name: 'After Hours',
      title: 'After Hours',
      image: 'https://i.scdn.co/image/ab67616d0000b273da5d5aeeabacacc1263c0f4b',
      release_date: '2020-03-20',
      total_tracks: 14,
      type: 'album',
      artist_id: {
        id: 1,
        name: 'The Weeknd',
        image: 'https://i.scdn.co/image/ab6761610000e5eb214f3cf1cbe7139c1e26ffbb',
      },
      artists: [{ id: 1, name: 'The Weeknd' }],
    },
    {
      playlist_id: 2,
      id: 'playlist-2',
      name: 'RapCaviar',
      title: 'RapCaviar',
      description: 'New music from top artists',
      image: 'https://i.scdn.co/image/ab67706f000000027ea4d505212b9de1f72c5112',
      total_tracks: 50,
      owner: { name: 'Spotify' },
    },
    {
      artist_id: 2,
      id: 'artist-2',
      name: 'Taylor Swift',
      image: 'https://i.scdn.co/image/ab6761610000e5eb859e4c14fa59296c8649e0e4',
      bio: 'American singer-songwriter',
      followers: 92000000,
      verified: true,
    },
    {
      album_id: 2,
      id: 'album-2',
      name: 'Midnights',
      title: 'Midnights',
      image: 'https://i.scdn.co/image/ab67616d0000b273e0b60c608586d6f4a9e63865',
      release_date: '2022-10-21',
      total_tracks: 13,
      type: 'album',
      artist_id: {
        id: 2,
        name: 'Taylor Swift',
        image: 'https://i.scdn.co/image/ab6761610000e5eb859e4c14fa59296c8649e0e4',
      },
      artists: [{ id: 2, name: 'Taylor Swift' }],
    },
    {
      id: 100,
      user_id: 100,
      username: 'music_lover',
      display_name: 'Music Lover',
      email: 'user@example.com',
      image: 'https://i.pravatar.cc/300?img=1',
      followers: 120,
      following: 85,
    },
  ],
};

// Component GridItemComponent cần được import từ list.jsx
export function GridItemComponent(props) {
  
  const { item, onClick } = props;
  
    if (item.playlist_id && !item.album_id) {
      return <TrackCard item={item} onClick={onClick} />;
    }

    if (item.artist_id && !item.album_id) {
      return <ArtistCard item={item} onClick={onClick} />;
    }

    if (item.album_id && item.artist_id) {
      return <AlbumCard item={item} onClick={onClick} />;
    }

    if (item.id && item.username) {
      return <ArtistCard item={item} onClick={onClick} />;
    }
  return null;
}

export function GridItemList(props) {
  const { onItemClick } = props;
  const { items = mockItems.mixed, chips, title = 'Danh sách phát' } = props;
  
  return (
    <div>
      <Flex justify='space-between' align='center'>
        <div>
          {title ? (
              <Link style={{ textDecoration: 'underline' }}>
                <h1 className='playlist-header'>{title}</h1>
              </Link>
          ) : null}
        </div>
      </Flex>

      {chips}
      <div
        className='playlist-grid'
        style={
          props.multipleRows
            ? {
                gridTemplateRows: 'unset',
              }
            : undefined
        }
      >
        {(items || [])
          .filter((i) => i)
          .map((item, index) => {
            // Tạo unique key cho mỗi item
            const getUniqueKey = () => {
              if (item.album_id) return `album-${item.album_id}-${index}`;
              if (item.artist_id) return `artist-${item.artist_id}-${index}`;
              if (item.playlist_id) return `playlist-${item.playlist_id}-${index}`;
              if (item.id && item.username) return `user-${item.id}-${index}`;
              return `item-${index}`;
            };

            if (item.album_id) {
              return (
                <div key={getUniqueKey()} style={{ position: 'relative' }}>
                  <GridItemComponent
                    item={item}
                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                  />
                </div>
              );
            } else if (item.artist_id) {
              return (
                <div key={getUniqueKey()} style={{ position: 'relative' }}>
                  <GridItemComponent
                    item={item}
                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                  />
                </div>
              );
            } else if (item.id && item.username) {
              return (
                <div key={getUniqueKey()} style={{ position: 'relative' }}>
                  <GridItemComponent
                    item={item}
                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                  />
                </div>
              );
            }
            else {
              return (
                <div key={getUniqueKey()} style={{ position: 'relative' }}>
                  <GridItemComponent
                    item={item}
                    onClick={onItemClick ? () => onItemClick(item) : undefined}
                  />
                </div>
              );
            }
          })} 
      </div>
    </div>
  );
}

// Helper components để hiển thị các loại mock data khác nhau

// Component hiển thị grid playlists với mock data
export function PlaylistsGrid(props) {
  return (
    <GridItemList 
      {...props}
      items={props.items || mockItems.playlists}
      title={props.title || 'Featured Playlists'}
    />
  );
}

// Component hiển thị grid artists với mock data
export function ArtistsGrid(props) {
  return (
    <GridItemList 
      {...props}
      items={props.items || mockItems.artists}
      title={props.title || 'Popular Artists'}
    />
  );
}

// Component hiển thị grid albums với mock data
export function AlbumsGrid(props) {
  return (
    <GridItemList 
      {...props}
      items={props.items || mockItems.albums}
      title={props.title || 'New Albums'}
    />
  );
}

// Component hiển thị grid users với mock data
export function UsersGrid(props) {
  return (
    <GridItemList 
      {...props}
      items={props.items || mockItems.users}
      title={props.title || 'Users'}
    />
  );
}

// Component hiển thị grid mixed (tất cả các loại) với mock data
export function MixedGrid(props) {
  return (
    <GridItemList 
      {...props}
      items={props.items || mockItems.mixed}
      title={props.title || 'Mixed Content'}
    />
  );
}

// Export mockItems để các component khác có thể sử dụng
export { mockItems };

// Default export
export default GridItemList;