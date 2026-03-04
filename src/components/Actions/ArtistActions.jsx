import { memo, useCallback, useMemo } from 'react';
import { Dropdown } from 'antd';
import { FollowIcon, UnfollowIcon } from '../Icons';

// import { useAppDispatch, useAppSelector } from '../../store/store';
// import { userService } from '../../services/users';
import { yourLibraryActions } from '../../store/slices/yourLibrary';
import { artistActions } from '../../store/slices/artist';
import { uiActions } from '../../store/slices/ui';

const ArtistActionsWrapper = memo((props) => {
  const { children, artist, trigger = ['contextMenu'] } = props;

  // const dispatch = useAppDispatch();
  const user = "";
  const myArtists = "";

  const handleUserValidation = useCallback(() => {
    if (!user) {
      return false;
    }
    return true;
  }, [user]);

  const artistId = artist?.artist_id;

  const items = useMemo(() => {
    const menuItems = [];

    if (true) {
      menuItems.push({
        key: 'remove',
        label: 'Bỏ theo dõi',
        icon: <UnfollowIcon />,
        onClick: async () => {
          if (!handleUserValidation()) return;
          // await userService.unfollowArtists(artistId);

        },
      });
    } else {
      menuItems.push({
        key: 'add',
        label: 'Theo dõi',
        icon: <FollowIcon />,
        onClick: async () => {
          if (!handleUserValidation()) return;
          // await userService.followArtists(artistId);

        },
      });
    }

    return menuItems;
  }, [artistId, handleUserValidation]);

  return (
    <Dropdown menu={{ items }} trigger={trigger}>
      {children}
    </Dropdown>
  );
});

export default ArtistActionsWrapper;
