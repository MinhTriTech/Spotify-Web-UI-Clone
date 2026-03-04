import { Link } from "react-router-dom";
import { usePlayer } from "../../context/PlayerContext";

const SongDetails = () => {
    const { currentTrack } = usePlayer();

    return (
        <div className="flex flex-row items-center playing-container ps-6">
        <div id="song-and-artist-name">
            <p className="text-white font-bold song-title" title={currentTrack?.title}>
            {currentTrack?.title}
            </p>

            <span
            className="text-gray-200 song-artist"
            title={currentTrack?.artist}>
                <span>
                    <Link to={`/artist/${currentTrack?.artist}`}>{currentTrack?.artist}</Link>
                </span>
            </span>
        </div>
        </div>
    );
};

export default SongDetails;