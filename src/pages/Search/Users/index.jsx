import { memo, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import NoSearchResults from '../NoResults';
import UsersSearchSection from './UsersSearchSection';
import { Col, Row } from 'antd';
import { search } from '../../../services/search.service';

const SearchUsersPage = memo((props) => {
  const params = useParams();

  const [users, setUsers] = useState([]);
  
    const handleSearch = async () => {
        try {
          const rs = await search(params.search, "user");
    
          setUsers(rs.users);
        } catch (error) {
          console.log(error);
        }
      }
      
      useEffect(() => {
        handleSearch();
      }, [params.search])

  if (users.length < 1) {
    return <NoSearchResults searchValue={params.search || ''} />;
  }

  return (
    <Row gutter={[16, 16]}>
      <Col span={24}>
        <UsersSearchSection users={users}/>
      </Col>
    </Row>
  );
});

export default SearchUsersPage;
