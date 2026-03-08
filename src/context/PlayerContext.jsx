import { createContext, useContext, useState, useRef, useEffect } from "react";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const audioRef = useRef(new Audio());

    // State cơ bản
    const [currentTrack, setCurrentTrack] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);

    // State thời lượng
    const [currentTime, setCurrentTime] = useState(0);
    const [duration, setDuration] = useState(0);

    // State danh sách
    const [trackList, setTrackList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);

    const playTrack = (track, list = []) => {
        if (list.length) {
            setTrackList(list);
            const index = list.findIndex(t => t._id === track._id);
            setCurrentIndex(index);
        }

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

    const nextTrack = () => {
        if (!trackList.length) return;

        const nextIndex = currentIndex + 1;

        if (nextIndex >= trackList.length) return;

        const next = trackList[nextIndex];

        setCurrentIndex(nextIndex);

        playTrack(next);
    }

    const prevTrack = () => {
        if (currentIndex <= 0) return;

        const prevIndex = currentIndex - 1;

        const prev = trackList[prevIndex];

        setCurrentIndex(prevIndex)

        playTrack(prev);
    }

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => {
            setCurrentTime(audio.currentTime);
        }

        const setMeta = () => {
            setDuration(audio.duration);
        }

        const handleEnded = () => {
            nextTrack();
        }

        audio.addEventListener("timeupdate", updateTime);
        audio.addEventListener("loadedmetadata", setMeta);
        audio.addEventListener("ended", handleEnded);

        return () => {
            audio.removeEventListener("timeupdate", updateTime);
            audio.removeEventListener("loadedmetadata", setMeta);
            audio.removeEventListener("ended", handleEnded);
        }
    }, [nextTrack]);

    return (
        <PlayerContext.Provider
            value={{
                audioRef,
                currentTrack,
                isPlaying,
                currentTime,
                duration,
                playTrack,
                pauseTrack,
                nextTrack,
                prevTrack,
            }}
            >
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);