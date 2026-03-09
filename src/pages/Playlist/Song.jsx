import SongView, { SongViewComponents } from '../../components/SongsTable/songView';

export const Song = ({ index, song }) => {
  const canEdit = false;

  return (
    <SongView
      activable
      index={index}
      canEdit={canEdit}
      song={song}
      fields={[
        SongViewComponents.TitleWithCover,
        SongViewComponents.Artists,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default Song;
