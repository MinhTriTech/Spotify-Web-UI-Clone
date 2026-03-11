import { memo } from 'react';

import { useParams } from 'react-router-dom';

import NoSearchResults from '../NoResults';
import { Col, Row } from 'antd';

import { SongsSearchSection, PlaylistsSearchSection, UsersSearchSection } from './Sections';

export const SearchPage = memo((props) => {
  const params = useParams();
  
  // Mock data
  const songs = [
    {
      _id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 200,
      url: 'https://example.com/song1.mp3',
      image: 'https://picsum.photos/200?random=1'
    },
    {
      _id: '2',
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 215,
      url: 'https://example.com/song2.mp3',
      image: 'https://picsum.photos/200?random=2'
    },
    {
      _id: '3',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: 203,
      url: 'https://example.com/song3.mp3',
      image: 'https://picsum.photos/200?random=3'
    }
  ];
  
  const playlists = [
    {
      _id: 'p1',
      title: 'Chill Vibes',
      description: 'Relax and unwind',
      owner: 'User123',
      image: 'https://picsum.photos/300?random=10',
      tracksCount: 50
    },
    {
      _id: 'p2',
      title: 'Workout Mix',
      description: 'Get pumped!',
      owner: 'FitUser',
      image: 'https://picsum.photos/300?random=11',
      tracksCount: 30
    }
  ];
  
  const users = [
    {
      _id: 'u1',
      username: 'MusicLover123',
      displayName: 'Music Lover',
      avatar: 'https://picsum.photos/100?random=20',
      followers: 1250
    },
    {
      _id: 'u2',
      username: 'DJSpotify',
      displayName: 'DJ Spotify',
      avatar: 'https://picsum.photos/100?random=21',
      followers: 5420
    }
  ];

  if (songs.length < 1 && playlists.length < 1 && users.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return (
    <Row gutter={[16, 16]} style={{ paddingBottom: 20 }}>
      <Col span={24} lg={15}>
        <SongsSearchSection songs={songs} />
      </Col>

      <Col span={24}>
        <PlaylistsSearchSection playlists={playlists} />
      </Col>

      <Col span={24}>
        <UsersSearchSection users={users} />
      </Col>
    </Row>
  );
});

export default SearchPage;
