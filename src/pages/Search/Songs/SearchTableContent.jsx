import SongView, { SongViewComponents } from '../../../components/SongsTable/songView';

export const SearchTableContent = (props) => {
  const { song, index } = props;

  return (
    <SongView
      activable
      index={index}
      song={song}
      fields={[
        SongViewComponents.Title,
        SongViewComponents.Artists,
        SongViewComponents.Actions,
      ]}
    />
  );
};

export default SearchTableContent;
