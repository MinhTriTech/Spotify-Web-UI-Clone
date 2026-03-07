import { createContext, useContext, useState, useRef } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const audioRef = useRef(new Audio());

    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const playTrack = (track) => {
        if (!audioRef.current) return;
        
        if (currentTrack?._id === track._id) {
            if (isPlaying) {
                audioRef.current.pause();
                setIsPlaying(false);
            } else {
                audioRef.current.play();
                setIsPlaying(true);
            }
            return;
        }

        audioRef.current.src = track.audioUrl;
        audioRef.current.play();

        setCurrentTrack(track);
        setIsPlaying(true);
    };

    const pauseTrack = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    return (
        <PlayerContext.Provider
            value={{
                currentTrack,
                isPlaying,
                playTrack,
                pauseTrack,
            }}
            >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);