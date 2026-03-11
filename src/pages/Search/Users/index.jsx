import { memo } from 'react';
import { useParams } from 'react-router-dom';

import NoSearchResults from '../NoResults';
import UsersSearchSection from './UsersSearchSection';
import { Col, Row } from 'antd';

const SearchUsersPage = memo((props) => {
  const params = useParams();

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

  if (users.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <UsersSearchSection />
      </Col>
    </Row>
  );
});

export default SearchUsersPage;
