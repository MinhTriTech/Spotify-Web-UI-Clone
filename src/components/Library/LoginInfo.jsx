import { memo } from 'react';



import WhiteButton from '../Button';
import { DetailsCard } from '../Layout/components/NowPlaying/Details/card';
import { useModal } from '../../context/ModalContext';

export const LibraryLoginInfo = memo(() => {
  const { openModal } = useModal();

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
            onClick={() => openModal('login')}
          />
        </div>
      </DetailsCard>
    </div>
  );
});
