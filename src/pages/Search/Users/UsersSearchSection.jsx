import { memo } from 'react';

import { GridItemList } from '../../../components/Lists/list';

const UsersSearchSection = memo(() => {
  const users = [
    {
      _id: 'u1',
      username: 'MusicLover123',
      displayName: 'Music Lover',
      avatar: 'https://picsum.photos/100?random=20',
      followers: 1250
    },
    {
      _id: 'u2',
      username: 'DJSpotify',
      displayName: 'DJ Spotify',
      avatar: 'https://picsum.photos/100?random=21',
      followers: 5420
    }
  ];

  return (
    <div>
      <div>
        <GridItemList
          multipleRows
          items={users}
        />
      </div>
    </div>
  );
});

export default UsersSearchSection;
