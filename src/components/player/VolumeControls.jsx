import { useState, useEffect, useRef } from 'react';
import { Space, Tooltip } from "antd";
import { usePlayer } from "../../context/PlayerContext";
import ModernSlider from "../Slider";
import { VolumeIcon, VolumeMuteIcon, VolumeOneIcon, VolumeTwoIcon } from '../Icons';

const getIcon = (volume) => {
  if (volume === 0) return <VolumeMuteIcon />;
  if (volume < 0.4) return <VolumeOneIcon />;
  if (volume < 0.7) return <VolumeTwoIcon />;
  return <VolumeIcon />;
};

const VolumeControls = () => {
    const { audioRef } = usePlayer();

    const [volume, setVolume] = useState(0.5);

    const prevVolumeRef = useRef(0.5);

    // Đồng bộ volume từ audio element khi component mount hoặc audio thay đổi
    useEffect(() => {
        const audio = audioRef.current;
        if (!audio) return;

        // Set volume ban đầu về 0.5 thay vì để mặc định 1.0
        audio.volume = 0.5;
        setVolume(0.5);
        prevVolumeRef.current = 0.5;

        // Lắng nghe sự thay đổi volume từ audio element
        const handleVolumeChange = () => {
            setVolume(audio.volume);
            if (audio.volume > 0) {
                prevVolumeRef.current = audio.volume;
            }
        };

        audio.addEventListener('volumechange', handleVolumeChange);

        return () => {
            audio.removeEventListener('volumechange', handleVolumeChange);
        };
    }, [audioRef]);

    const muted = volume === 0;

    const handleMuteToggle = () => {
        if (!audioRef.current) return;
        
        const newVolume = muted ? prevVolumeRef.current : 0;
        audioRef.current.volume = newVolume;
        setVolume(newVolume);
    };

    const handleVolumeChange = (value) => {
        if (!audioRef.current) return;
        
        audioRef.current.volume = value;
        setVolume(value);
        
        if (value > 0) {
            prevVolumeRef.current = value;
        }
    };

    return (
        <div className="volume-control-container" onClick={(e) => e.stopPropagation()}>
            <Space size={6} style={{ display: 'flex', alignItems: 'center' }}>
                <Tooltip title={muted ? 'Unmute' : 'Mute'}>
                    <div 
                        onClick={handleMuteToggle}
                        className="cursor-pointer"
                    >
                        {getIcon(volume)}
                    </div>
                </Tooltip>

                <div style={{ width: 90 }} onClick={(e) => e.stopPropagation()}>
                    <ModernSlider
                        isEnabled={true}
                        value={volume}
                        min={0}
                        max={1}
                        step={0.01}
                        onChange={handleVolumeChange}
                        controlType="volume"
                    />
                </div>
            </Space>
        </div>
    );
}

export default VolumeControls;