import { Col, Row } from 'antd';
import { Pause, Play, SkipBack, SkipNext } from '../Icons';
import { memo, useCallback } from 'react';
import { usePlayer } from '../../context/PlayerContext';

const SkipBackButton = memo(() => {
  const { currentTrack, prevTrack } = usePlayer();
  const disabled = !currentTrack;

  return (
    <button
      className={disabled ? 'disabled' : ''}
      onClick={() => prevTrack()}
      disabled={disabled}
    >
      <SkipBack />
    </button>
  );
});

const PlayButton = memo(() => {
    const { currentTrack, isPlaying, playTrack } = usePlayer();
    const disabled = !currentTrack;

    return (
        <button
        className={`player-pause-button ${disabled ? 'disabled' : ''} ${isPlaying ? 'active' : ''}`}
        onClick={() => playTrack(currentTrack)}
        >
          {!isPlaying ? <Play /> : <Pause />}
        </button>
    );
});

const SkipNextButton = memo(() => {
  const { currentTrack, nextTrack } = usePlayer();
  const disabled = !currentTrack;

  return (
    <button
      className={disabled ? 'disabled' : ''}
      onClick={() => nextTrack()}
      disabled={disabled}
    >
      <SkipNext />
    </button>
  );
});


const CONTROLS = [SkipBackButton, PlayButton, SkipNextButton];

const ControlButtons = () => {
  return (
    <Row gutter={33} align='middle' style={{ justifyContent: 'center' }}>
      {CONTROLS.map((Component, index) => (
        <Col key={index}>
          <Component />
        </Col>
      ))}
    </Row>
  );
};

export default ControlButtons;