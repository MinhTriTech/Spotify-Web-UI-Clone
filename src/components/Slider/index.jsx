import '../../styles/slider.css';

const ModernSlider = ({
  isEnabled = false,
  value = 0,
  min = 0,
  max = 1,
  step = 0.01,
  onChange,
  onChangeComplete,
  controlType = 'default',
  disable,
  ...otherProps
}) => {
  // Đảm bảo value luôn là số hợp lệ
  const safeValue = isNaN(value) || value === null || value === undefined ? 0 : Number(value);
  
  const handleChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (onChange) onChange(newValue, controlType);
  };

  const handleMouseUp = (e) => {
    const newValue = parseFloat(e.target.value);
    if (onChangeComplete) onChangeComplete(newValue, controlType);
  };

  const handleTouchEnd = (e) => {
    const newValue = parseFloat(e.target.value);
    if (onChangeComplete) onChangeComplete(newValue, controlType);
  };

//   const { currentSrc } = useAudio();
  const disabled = disable;

  const percentage = ((safeValue - min) / (max - min)) * 100;

  return (
    <div className="custom-slider-container" data-control-type={controlType}>
      <div className="relative w-full flex">
        <input
          type="range"
          disabled={disabled}
          value={safeValue}
          min={min}
          max={max}
          step={step}
          onChange={handleChange}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleTouchEnd}
          className="custom-slider"
          style={{
            background: `linear-gradient(to right, #1ed760 0%, #1ed760 ${percentage}%, #535353 ${percentage}%, #535353 100%)`
          }}
          {...otherProps}
        />
      </div>
    </div>
  );
};

export default ModernSlider;
