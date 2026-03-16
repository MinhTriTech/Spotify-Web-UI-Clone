import { memo, useCallback } from 'react';
import WhiteButton from '../../../Button';

export const LoginFooter = memo(() => {
  const handleLogin = useCallback(() => {
    console.log("Login");
  }, []);

  return (
    <div className='login-footer' style={{ margin: '0px 10px' }}>
      <div className='login-container'>
        <div>
          <p className='title' style={{ textAlign: 'start' }}>Xem trước</p>
          <p className='description'>Đăng nhập để sử dụng đầy đủ tính năng của ứng dụng.</p>
        </div>

        <WhiteButton title="Đăng nhập" onClick={handleLogin}/>
      </div>
    </div>
  );
});
