import { Col } from 'antd';
import { memo, useEffect, useState } from 'react';

import { LibraryTitle } from './LibraryTitle';
import { ListItemComponent } from './ListCards';
import { getPlaylists } from '../../services/playlist.service';

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
                height: `calc(100vh - 218px)`,
                }}
            >
                <LoggedContent />
            </div>
        </Col>
      </div>
    </div>
  );
};

const getItemKey = (item) => {
  if (item.playlist_id) return `playlist-${item.playlist_id}`;
  if (item.id) return `likeSongs-${item.id}`;
  return `unknown-${Math.random()}`; 
};

const LoggedContent = memo(() => {
    const [playlists, setPlaylists] = useState([]); 

    const fetchPlaylists = async () => {
        try {
            const data = await getPlaylists();
            setPlaylists(data);
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        fetchPlaylists();
    }, []);
  
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
