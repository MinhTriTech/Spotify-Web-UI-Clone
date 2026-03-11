import { memo } from 'react';

import { GridItemList } from '../../../components/Lists/list';

const PlaylistsSearchSection = memo(() => {
  const playlists = [
    {
      _id: 'p1',
      title: 'Chill Vibes',
      description: 'Relax and unwind',
      owner: 'User123',
      image: 'https://picsum.photos/300?random=10',
      tracksCount: 50
    },
    {
      _id: 'p2',
      title: 'Workout Mix',
      description: 'Get pumped!',
      owner: 'FitUser',
      image: 'https://picsum.photos/300?random=11',
      tracksCount: 30
    }
  ];

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
