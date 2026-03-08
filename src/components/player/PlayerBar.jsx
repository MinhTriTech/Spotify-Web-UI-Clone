import ExtraControlButtons from "./ExtraControlButtons";
import PlayControls from "./PlayControls";
import SongDetails from "./SongDetails";

const PlayerBar = () => {
  return (
    <>
      <div>
        <div className="w-full bg-black p-6 flex items-center justify-between h-full mobile-hidden">
          <SongDetails />
          <PlayControls />
          <ExtraControlButtons />
        </div>
      </div>
    </>
  );
};

export default PlayerBar;