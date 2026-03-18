import { Modal } from 'antd';
import { memo, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WhiteButton from '../Button';

import { DEFAULT_PAGE_COLOR } from '../../constants/spotify';

import tinycolor from 'tinycolor2';
import { getImageAnalysis2 } from '../../utils/imageAnyliser';

const LoginModal = memo(({ onClose }) => {
  const [open, setOpen] = useState(true);
  const [color, setColor] = useState(DEFAULT_PAGE_COLOR);
  const navigate = useNavigate();

  const imgUrl = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSlHg72kKQUwmwnv0c4hR8ylg0Img2EAWi_5y0QJ4upZ_QJj21KxVxRKEewcwM0uZ4Xp5L1runsN3lwQt83tZ5ZRZZjEojYsj7damlANg&s=10";

  useEffect(() => {
    if (imgUrl) {
      getImageAnalysis2(imgUrl).then((color) => {
        let colorObj = tinycolor(color);
        while (colorObj.isLight()) {
          colorObj = colorObj.darken(10);
        }
        setColor(colorObj.toHexString());
        setOpen(true);
      });
    }
    return () => {
      setOpen(false);
    };
  }, [imgUrl]);

  const handleLoginClick = () => {
    onClose?.();
    navigate('/login');
  };

  return (
    <Modal
      centered
      width={780}
      open={open}
      footer={null}
      destroyOnClose
      onCancel={onClose}
      className='login-modal'
      wrapClassName='overlay-modal'
      style={{
        ['--background-color']: color,
      }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          flexDirection: 'row',
        }}
      >
        <div className='img-container'>
          <img alt='' loading='lazy' src={imgUrl} />
        </div>
        <div className='content-container'>
          <h2 style={{ lineHeight: 1.4 }}>
            Bắt đầu nghe với tài khoản Spotify miễn phí
          </h2>

          <div style={{ marginTop: 25 }}>
            <WhiteButton title="Đăng nhập" onClick={handleLoginClick} />
          </div>
        </div>
      </div>
    </Modal>
  );
});

LoginModal.displayName = 'LoginModal';

export default LoginModal;
