import { useState, useCallback } from "react";
import { usePlayer } from "../../context/PlayerContext";
import ModernSlider from "../Slider";
import { formatTimeDuration } from "../../utils/common.js"

const SongProgressBar = () => {
    const { audioRef, duration, currentTime, progressSlider } = usePlayer();
    const [isDragging, setIsDragging] = useState(false);
    const [localProgress, setLocalProgress] = useState(0);
    
    // Khi user kéo slider - chỉ update UI
    const handleSliderChange = useCallback((value) => {
        setIsDragging(true);
        setLocalProgress(value);
    }, []);
    
    // Khi user thả chuột - seek audio đến vị trí mới
    const handleSliderChangeComplete = useCallback((value) => {
        if (!audioRef.current || !duration) return;
        
        try {
            const newTime = Math.max(0, Math.min(value * duration, duration));
            audioRef.current.currentTime = newTime;
            
            // Delay một chút để tránh conflict với timeupdate event
            setTimeout(() => {
                setIsDragging(false);
            }, 100);
        } catch (err) {
            console.error(err);
            setIsDragging(false);
        }
    }, [audioRef, duration]);
    
    // Hiển thị progress: nếu đang kéo thì dùng localProgress, không thì dùng từ context
    const displayProgress = isDragging ? localProgress : progressSlider;
    const displayTime = isDragging ? localProgress * duration : currentTime;
    
    return (
        <div className="flex items-center justify-between w-full">
            <div className="text-white mr-2 text-xs">
                {formatTimeDuration(displayTime)}
            </div>
            <div className="w-full">
                <ModernSlider 
                    isEnabled
                    value={displayProgress}
                    onChange={handleSliderChange}
                    onChangeComplete={handleSliderChangeComplete}
                    controlType="progress"
                />
            </div>
            <div className="text-white ml-2 text-xs">{formatTimeDuration(duration)}</div>
        </div>
    );
}

export default SongProgressBar;