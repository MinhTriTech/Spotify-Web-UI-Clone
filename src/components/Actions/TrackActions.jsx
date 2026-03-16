import { memo, useState, useEffect } from 'react';
import { Dropdown } from 'antd';
import { useParams } from 'react-router-dom';

import { DeleteIcon, AddToPlaylist} from '../Icons';
import { addTrackToPlaylist, getRandomPlaylists, createPlaylist, getPlaylistById, removeTrackFromPlaylist } from '../../services/playlist.service';
import { usePlayer } from '../../context/PlayerContext';

const TrackActionsWrapper = memo((props) => {
  const { children, track, canEdit, trigger } = props;

  const { id } = useParams();

  const { currentPlaylist } = usePlayer();

  const [playlistOptions, setPlaylistOptions] = useState([]);

  useEffect(() => {
    const loadFilteredPlaylists = async () => {
      if (!track?._id) return;

      const myPlaylists = await getRandomPlaylists();
      
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
