import { memo } from 'react';
import { GridItemList } from '../../components/Lists/list';


export const MyPlaylistsSection = memo(( props ) => {
  const { playlists } = props;
  
  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div style={{ marginTop: 10, marginBottom: 10 }}>
      <GridItemList
        items={playlists}
        title="Playlist"
      />
    </div>
  );
});
