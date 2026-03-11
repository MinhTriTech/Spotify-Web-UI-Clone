import { memo, useEffect, useState } from 'react';

import NoSearchResults from '../NoResults';

import { useParams } from 'react-router-dom';
import { Col, Row } from 'antd';
import PlaylistsSearchSection from './PlaylistsSearchSection';
import { search } from '../../../services/search.service';

const SearchPlaylistPage = memo((props) => {
  const params = useParams();

  const [playlists, setPlaylists] = useState([]);

  const handleSearch = async () => {
      try {
        const rs = await search(params.search, "playlist");
  
        setPlaylists(rs.playlists);
      } catch (error) {
        console.log(error);
      }
    }
    
    useEffect(() => {
      handleSearch();
    }, [params.search])

  if (playlists.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <PlaylistsSearchSection playlists={playlists}/>
      </Col>
    </Row>
  )
  ;
});

export default SearchPlaylistPage;
