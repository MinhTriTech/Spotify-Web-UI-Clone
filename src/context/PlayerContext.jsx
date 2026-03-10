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
    const [progressSlider, setProgressSlider] = useState(0);

    // State playlist
    const [currentPlaylist, setCurrentPlaylist] = useState(null);
    const [trackList, setTrackList] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(null);

    // Suffle và Repeat
    const [isShuffle, setIsShuffle] = useState(false);
    const [repeatMode, setRepeatMode] = useState("off");

    const playTrack = (track, list = [], playlistId) => {
        if (list.length) {
            setTrackList(list);
            const index = list.findIndex(t => t._id === track._id);
            setCurrentIndex(index);
            setCurrentPlaylist(playlistId);
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

        audioRef.current.src = `${import.meta.env.VITE_URL}${track.audioUrl}`;
        audioRef.current.play();

        setCurrentTrack(track);
        setIsPlaying(true);

        console.log(currentPlaylist);
        
    };

    const pauseTrack = () => {
        audioRef.current.pause();
        setIsPlaying(false);
    };

    const nextTrack = () => {
        if (!trackList.length) return;

        let nextIndex;

        if(isShuffle) {
            nextIndex = Math.floor(Math.random() * trackList.length);
        } else {
            nextIndex = currentIndex + 1;
    
            if (nextIndex >= trackList.length) {
                if (repeatMode === "all") {
                    nextIndex = 0;
                } else {
                    return;
                }
            };

        }

        const next = trackList[nextIndex];

        setCurrentIndex(nextIndex);

        playTrack(next);
    };

    const prevTrack = () => {
        if (currentIndex <= 0) return;

        const prevIndex = currentIndex - 1;

        const prev = trackList[prevIndex];

        setCurrentIndex(prevIndex)

        playTrack(prev);
    };

    const toggleRepeat = () => {
        setRepeatMode(prev => {
            if (prev === "off") return "all";
            if (prev === "all") return "one";
            return "off";
        });
    };

    useEffect(() => {
        const audio = audioRef.current;

        const updateTime = () => {
            const currentTimeVal = audio.currentTime;
            setCurrentTime(currentTimeVal);

            const progressSliderVal = currentTimeVal / audio.duration;
            setProgressSlider(progressSliderVal);
        }

        const setMeta = () => {
            setDuration(audio.duration);
        }

        const handleEnded = () => {
            if (repeatMode === "one") {
                audioRef.current.currentTime = 0;
                audioRef.current.play();
                return;
            }

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
                currentPlaylist,
                isPlaying,
                currentTime,
                duration,
                progressSlider,
                repeatMode,
                isShuffle,
                setIsShuffle,
                toggleRepeat,
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