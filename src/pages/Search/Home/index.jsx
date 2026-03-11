import { memo, useEffect, useState } from 'react';

import { useParams } from 'react-router-dom';

import NoSearchResults from '../NoResults';
import { Col, Row } from 'antd';

import { SongsSearchSection, PlaylistsSearchSection, UsersSearchSection } from './Sections';
import { search } from '../../../services/search.service';

export const SearchPage = memo((props) => {
  const params = useParams();

  const [songs, setSongs] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [users, setUsers] = useState([]);

  const handleSearch = async () => {
    try {
      const rs = await search(params.search, "all");

      setSongs(rs.tracks);
      setPlaylists(rs.playlists);
      setUsers(rs.users);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    handleSearch();
  }, [params.search])

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
