import { memo } from 'react';

import NoSearchResults from '../NoResults';

import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import PlaylistsSearchSection from './PlaylistsSearchSection';

const SearchPlaylistPage = memo((props) => {
  const params = useParams();

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

  if (playlists.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PlaylistsSearchSection />
      </Col>
    </Row>
  )
  ;
});

export default SearchPlaylistPage;
