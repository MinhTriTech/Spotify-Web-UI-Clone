import { usePlayer } from "../../context/PlayerContext";

const SongProgressBar = () => {
    const { audioRef, duration, currentTime } = usePlayer();

    return (
        <input
            type="range" 
            min="0"
            max={duration}
            value={currentTime}
            onChange={(e) => {
                audioRef.current.currentTime = e.target.value;
            }}
        />
    );
}

export default SongProgressBar;