import { usePlayer } from "../../context/PlayerContext";

const PlayerBar = () => {
    const { currentTrack, isPlaying, pauseTrack } = usePlayer();

    if (!currentTrack) return null;

    return (
        <div style={{ background: "#000", color: "white", padding: "20px" }}>
            <p>
                {currentTrack.title} - {currentTrack.artist}
            </p>

            {isPlaying ? (
                <button onClick={pauseTrack}>Pause</button>
            ) : (
                <p>Paused</p>
            )}
        </div>
    );
};

export default PlayerBar;