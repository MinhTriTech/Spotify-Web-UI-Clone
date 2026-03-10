import { memo, useState, useEffect } from 'react';
import { Dropdown } from 'antd';
import { useLocation } from 'react-router-dom';

import { DeleteIcon, AddToPlaylist} from '../Icons';
import { addTrackToPlaylist, getPlaylists, createPlaylist, getPlaylistById } from '../../services/playlist.service';
import { usePlayer } from '../../context/PlayerContext';

const TrackActionsWrapper = memo((props) => {
  const { children, track, canEdit, trigger } = props;
  const location = useLocation();

  const { currentPlaylist } = usePlayer();
  const likedSongs = location.pathname === '/collection/tracks';
  


  const [playlistOptions, setPlaylistOptions] = useState([]);
  const [isTrackInLikeSongs, setIsTrackInLikeSongs] = useState(false);

  useEffect(() => {
    const loadFilteredPlaylists = async () => {
      if (!track?._id) return;

      const myPlaylists = await getPlaylists();
      
      if (!myPlaylists || myPlaylists.length === 0) return;

      const filtered = await Promise.all(
        myPlaylists
          .filter(p => p._id !== currentPlaylist)
          .map(async (p) => {
            const response = await getPlaylistById(p._id);
            const containsTrack = response.tracks.some(song => song._id === track._id);
            
            return !containsTrack ? p : null;
          })
      );

      const validPlaylists = filtered.filter(Boolean);

      const options = validPlaylists.map((p) => ({
        key: p._id,
        label: p.title,
        onClick: async () => {
          await addTrackToPlaylist(p._id, track._id);
        },
      }));

      setPlaylistOptions(options);
    };

    loadFilteredPlaylists();
  }, [track._id]);

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
                
                window.dispatchEvent(new CustomEvent('playlist-created'));
                
                await addTrackToPlaylist(playlist._id, track._id);
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
    
    if (canEdit || isTrackInLikeSongs) {
      items.push({
        label: 'Xóa khỏi playlist này',
        key: 'remove-from-playlist',
        icon: <DeleteIcon />,
        onClick: () => {
          if (!handleUserValidation()) return;

          if (likedSongs) {
            userService.deleteTracks(track.song_id).then(() => {
              // dispatch(likedSongsActions.fetchLikeSongs());
            });
          } else {
            playlistService.removePlaylistItems(currentPlaylist.playlist_id, track.song_id).then(() => {
              // dispatch(playlistActions.refreshPlaylist(playlistCurrent.playlist_id));
              // dispatch(playlistActions.removeTrack({ id: track.song_id }));
              // dispatch(yourLibraryActions.fetchMyPlaylists());
            });
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
