import { memo } from 'react';

import { GridItemList } from '../../../components/Lists/list';

const PlaylistsSearchSection = memo((props) => {
  const { playlists } = props;

  if (!playlists || !playlists.length) {
    return null;
  }

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={playlists}
        />
      </div>
    </div>
  );
});

export default PlaylistsSearchSection;
