import { Col } from 'antd';
import { memo } from 'react';

import { LibraryTitle } from './LibraryTitle';
import { ListItemComponent } from './ListCards';
import { useUserPlaylists } from '../../hooks/queries/useUserPlaylists';

const Library = () => {
  return (
    <div className={'Navigation-section library open'}>
      <LibraryTitle />

      <div className='library-list-container'>
        <Col>
            <div
                className='library-list'
                style={{
                overflowY: 'scroll',
                overflowX: 'hidden',
                height: `calc(100vh - 242px)`,
                }}
            >
                <LoggedContent />
            </div>
        </Col>
      </div>
    </div>
  );
};

const LoggedContent = memo(() => {
    const { data: playlists, isLoading: playlistLoading } = useUserPlaylists(); 

    if (playlistLoading) return <div style={{display: 'flex' ,alignItems: 'center' ,color: 'white', height: '100%', justifyContent: 'center'}}>Đang tải...</div>
  
    return (
        <div>
            {playlists.map((item) => {
                return (
                    <ListItemComponent key={item._id} item={item} />
                );
            })}
        </div>
    );
});

export default Library;
