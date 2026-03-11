import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

export const NoSearchResults = memo(({ searchValue }) => {
  const navigate = useNavigate();

  return (
    <div className='wrapper'>
      <div className='container'>
        <h3>Không có kết quả</h3>
        <p>
          Không tìm thấy kết quả nào cho "{searchValue}".
        </p>

        <button onClick={() => navigate('/home')}>Trang chủ</button>
      </div>
    </div>
  );
});

NoSearchResults.displayName = 'NoSearchResults';

export default NoSearchResults;
