import { memo } from 'react';
import { useParams } from 'react-router-dom';

import NoSearchResults from '../NoResults';
import SearchTracksTable from './SearchTracksTable';
import { Col, Row } from 'antd';

const SearchSongsPage = memo((props) => {
  const params = useParams();

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

  if (songs.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SearchTracksTable query={params.search} />;
      </Col>
    </Row>
  );
});

export default SearchSongsPage;
