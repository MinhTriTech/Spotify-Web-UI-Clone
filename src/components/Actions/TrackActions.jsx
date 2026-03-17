import { memo, useState, useEffect } from 'react';
import { Dropdown } from 'antd';
import { useParams } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';

import { DeleteIcon, AddToPlaylist} from '../Icons';
import { addTrackToPlaylist, createPlaylist, removeTrackFromPlaylist } from '../../services/playlist.service';
import { usePlayer } from '../../context/PlayerContext';
import { useUserPlaylists } from '../../hooks/queries/useUserPlaylists';

const TrackActionsWrapper = memo((props) => {
  const { children, track, canEdit, trigger } = props;

  const { id } = useParams();

  const { currentPlaylist } = usePlayer();
  const queryClient = useQueryClient();
  const { data: myPlaylists = [] } = useUserPlaylists();

  const [playlistOptions, setPlaylistOptions] = useState([]);

  const getTrackId = (trackItem) => {
    if (!trackItem) return null;
    if (typeof trackItem === 'string') return trackItem;
    if (trackItem?._id) return trackItem._id;

    if (trackItem?.track) { 
      if (typeof trackItem.track === 'string') return trackItem.track;
      if (trackItem.track?._id) return trackItem.track._id;
    }

    return null;
  };

  useEffect(() => {
    const loadFilteredPlaylists = () => {
      if (!track?._id) return;
      if (!myPlaylists || myPlaylists.length === 0) return;

      const validPlaylists = myPlaylists.filter((playlist) => {
        if (!playlist || playlist._id === currentPlaylist) return false;

        const trackIds = (playlist.tracks || []).map((trackItem) =>
          getTrackId(trackItem)
        );

        return !trackIds.some((trackId) => String(trackId) === String(track._id));
      });

      const options = validPlaylists.map((p) => ({
        key: p._id,
        label: p.title,
        onClick: async () => {
          await addTrackToPlaylist(p._id, track._id);
          await queryClient.invalidateQueries({ queryKey: ['myPlaylists'] });
        },
      }));

      setPlaylistOptions(options);
    };

    loadFilteredPlaylists();
  }, [track?._id, myPlaylists, currentPlaylist]);

  const getItems = () => {
    const items = [
      {
        label: 'Thêm vào playlist',
        icon: <AddToPlaylist />,
        key: 'add-to-playlist',
        children: [
          {
            label: 'Tạo playlist mới',
            key: 'new',
            onClick: async () => {
              try {
                const playlist = await createPlaylist({
                  title: "Danh sách phát của tôi",
                  description: "",
                });

                queryClient.setQueryData(['myPlaylists'], (oldPlaylists = []) => {
                  if (oldPlaylists.some((item) => item._id === playlist._id)) return oldPlaylists;
                  return [playlist, ...oldPlaylists];
                });
                
                await addTrackToPlaylist(playlist._id, track._id);
                await queryClient.invalidateQueries({ queryKey: ['myPlaylists'] });
              } catch (error) {
                console.error('Failed to create playlist:', error);
              }
            },
          },
          { type: 'divider' },
          ...playlistOptions,
        ],
      },
    ];
    
    if (canEdit) {
      items.push({
        label: 'Xóa khỏi playlist này',
        key: 'remove-from-playlist',
        icon: <DeleteIcon />,
        onClick: async () => {
          try {
            await removeTrackFromPlaylist(id, track._id);
          } catch (error) {
            console.error('Failed to delete playlist:', error);
          }
        },
      });
    }

    return items;
  };

  const items = getItems();

  return (
    <Dropdown menu={{ items }} trigger={trigger}>
      {children}
    </Dropdown>
  );
});

export default TrackActionsWrapper;
