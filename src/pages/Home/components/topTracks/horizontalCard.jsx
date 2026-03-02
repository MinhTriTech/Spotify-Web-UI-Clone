import { memo, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { PlayCircle } from '../../../../components/Lists/PlayCircle';
import TrackActionsWrapper from '../../../../components/Actions/TrackActions';

import tinycolor from 'tinycolor2';
import { getImageAnalysis2 } from '../../../../utils/imageAnyliser';

import { useAudio } from '../../../../contexts/AudioContext';

import { EQUILISER_IMAGE } from '../../../../constants/spotify';

export const HorizontalCard = memo(({ item, setColor }) => {
  const { currentSrc, isPlaying } = useAudio(); 

  const isCurrent = currentSrc.includes(item.file_path);

  useEffect(() => {
    if (item && item.image) {
      getImageAnalysis2(item.image).then((result) => {
        // Handle successful image analysis
      }).catch((error) => {
        console.warn('Image analysis failed:', error);
      });
    }
  }, [item]);

  return (
    <TrackActionsWrapper track={item} trigger={['contextMenu']}>
      <div
        className="horizontal-playlist"
        onMouseEnter={ () => {
          if (item && item.image) {
            getImageAnalysis2(item.image).then((r) => {
              let color = tinycolor(r);
              while (color.isLight()) {
                color = color.darken(10);
              }
              setColor(color.toHexString());
            }).catch((error) => {
              console.warn('Image analysis failed on hover:', error);
              // Set a default color if image analysis fails
              setColor('#1db954'); // Spotify green as fallback
            });
          }
        }
        }
      >
        <div style={{ display: 'flex' }}>
          <div className="img-container">
            <div className="img-section">
              <img
                src={item.image}
                alt={item.title}
                onError={(e) => {
                  e.target.style.display = 'none';
                  console.warn('Failed to load image:', item.image);
                }}
                onLoad={() => {
                  // Image loaded successfully
                }}
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
