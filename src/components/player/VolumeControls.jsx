import { usePlayer } from "../../context/PlayerContext";

const VolumeControls = () => {
    const { audioRef } = usePlayer();

    return (
        <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            onChange={(e) => {
                audioRef.current.volume = e.target.value;
            }}
        />
    );
}

export default VolumeControls;