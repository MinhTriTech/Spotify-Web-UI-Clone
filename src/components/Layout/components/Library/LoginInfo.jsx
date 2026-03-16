import { memo, useCallback, useEffect } from 'react';

import WhiteButton from '../../../Button';
import { DetailsCard } from '../NowPlaying/Details/card';

export const LibraryLoginInfo = memo(() => {
  const handleLogin = useCallback(() => {
    console.log("Login");
  }, []);

  return (
    <div style={{ marginRight: -5 }}>
      <DetailsCard title="Truy cập thư viện của bạn">
        <p style={{ fontWeight: 400, color: '#fff' }}>
          Đăng nhập để sử dụng đầy đủ tính năng của ứng dụng
        </p>
        <div style={{ marginTop: 20, marginBottom: 30, position: 'relative' }}>
          <WhiteButton
            size='small'
            title="Đăng nhập"
            onClick={handleLogin}
          />
        </div>
      </DetailsCard>
    </div>
  );
});
