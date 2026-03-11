import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NoSearchResults from '../NoResults';
import SearchTracksTable from './SearchTracksTable';
import { Col, Row } from 'antd';
import { search } from '../../../services/search.service';

const SearchSongsPage = memo((props) => {
  const params = useParams();

  const [songs, setSongs] = useState([]);

  const handleSearch = async () => {
    try {
      const rs = await search(params.search, "track");

      setSongs(rs.tracks);
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(() => {
    handleSearch();
  }, [params.search])

  if (songs.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <SearchTracksTable query={params.search} tracks={songs}/>;
      </Col>
    </Row>
  );
});

export default SearchSongsPage;
