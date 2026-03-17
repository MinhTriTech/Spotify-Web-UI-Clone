import { memo } from 'react';
import { Link } from 'react-router-dom';

import { usePlayer } from '../../context/PlayerContext';

import { PlayCircle } from '../../components/Lists/PlayCircle';
import TrackActionsWrapper from '../../components/Actions/TrackActions';


import { EQUILISER_IMAGE } from '../../constants/spotify';
import { PLAYLIST_DEFAULT_IMAGE } from '../../constants/spotify';

export const HorizontalCard = memo(({ item, setColor }) => {
    const { currentTrack, isPlaying } = usePlayer(); 
    
    const isCurrent = currentTrack?.audioUrl === item.audioUrl;

    return (
        <TrackActionsWrapper track={item} trigger={['contextMenu']}>
            <div className="horizontal-playlist">
                <div style={{ display: 'flex' }}>
                    <div className="img-container">
                        <div className="img-section">
                        <img
                            src={PLAYLIST_DEFAULT_IMAGE}
                            alt={item.title}
                        />
                        </div>
                    </div>
                </div>

                <div className="text-container">
                    <div className="text-section">
                        <div>
                            <Link title={item.title}>
                                <p>{item.title}</p>
                            </Link>
                        </div>
                    </div>

                    <div className="button-container">
                        {isCurrent && isPlaying ? (
                            <img height={20} alt={item.title} src={EQUILISER_IMAGE} />
                        ) : null}
                        <PlayCircle size={15} isCurrent={isCurrent} context={item} />
                    </div>
                </div>
            </div>
        </TrackActionsWrapper>
    );
});
