import { memo } from 'react';
import WhiteButton from '../../../Button';
import { useModal } from '../../../../context/ModalContext';

export const LoginFooter = memo(() => {
  const { openModal } = useModal();

  return (
    <div className='login-footer' style={{ margin: '0px 10px' }}>
      <div className='login-container'>
        <div>
          <p className='title' style={{ textAlign: 'start' }}>Xem trước</p>
          <p className='description'>Đăng nhập để sử dụng đầy đủ tính năng của ứng dụng.</p>
        </div>

        <WhiteButton title="Đăng nhập" onClick={() => openModal('login')}/>
      </div>
    </div>
  );
});
