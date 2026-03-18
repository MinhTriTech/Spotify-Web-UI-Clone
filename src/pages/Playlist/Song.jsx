import SongView, { SongViewComponents } from '../../components/SongsTable/songView';
import { useAuth } from '../../context/AuthContext';

export const Song = ({ index, song, playlist, onTrackRemoved }) => {
  const { user } = useAuth();
  const userId = user.user;

  const ownerId = playlist?.owner?._id || playlist?.owner;
  const canEdit = Boolean(ownerId && userId?._id && String(ownerId) === String(userId?._id));
  
  return (
    <SongView
      activable
      index={index}
      canEdit={canEdit}
      song={song}
      onTrackRemoved={onTrackRemoved}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Artists,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
