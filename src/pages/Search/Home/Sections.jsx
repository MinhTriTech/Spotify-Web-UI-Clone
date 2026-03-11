import { memo } from 'react';

import { GridItemList } from '../../../components/Lists/list';

import SongView, { SongViewComponents } from '../../../components/SongsTable/songView';


export const PlaylistsSearchSection = memo(({ playlists = [] }) => {
  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          items={playlists}
          title="Danh sách phát"
        />
      </div>
    </div>
  );
});

const SearchSongView = (props) => {
  const { song, index } = props;

  return (
    <SongView
      activable
      index={index}
      song={song}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Artists,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export const SongsSearchSection = memo(({ songs = [] }) => {
  if (!songs || songs.length === 0) return null; 
  
  return (
    <div className='search-songs-container'>
      <h1 className='section-title'>Bài hát</h1>
      
      <div>
        {songs.map((song, index) => (
          <SearchSongView song={song} key={song._id || song.id || song.song_id || index} index={index} />
        ))}
      </div>
    </div>
  );
});

export const UsersSearchSection = memo(({ users = [] }) => {
  if (!users || !users.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          items={users}
          title="Người dùng"
        />
      </div>
    </div>
  );
});



