import { Input, Space } from 'antd';
import NavigationButton from './NavigationButton';
import { ActiveHomeIcon, HomeIcon, SearchIcon } from '../../../Icons';

import { useLocation, useNavigate } from 'react-router-dom';
import { memo, useEffect, useMemo, useRef, useState } from 'react';
import { useDebounce } from 'use-debounce';

function usePrevious(value) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

export const Search = memo(() => {
  const navigate = useNavigate();
  const location = useLocation();

  const [inputValue, setInputValue] = useState('');
  const [debouncedValue] = useDebounce(inputValue, 600);
  const prevValue = usePrevious(debouncedValue);

  useEffect(() => {
    const isSearchRoute = location.pathname.startsWith('/search/');

    if (!isSearchRoute) {
      setInputValue('');
      return;
    }

    const searchValue = location.pathname.split('/')[2] || '';
    setInputValue(decodeURIComponent(searchValue));
  }, [location.pathname]);

  useEffect(() => {
    if (debouncedValue !== '' && debouncedValue !== prevValue) {
      navigate(`/search/${debouncedValue}`);
    }
  }, [debouncedValue, prevValue, navigate]);

  const isHome = useMemo(() => location.pathname === '/home', [location.pathname]);

  return (
    <Space size={10} align="center">
      <NavigationButton
        text="Trang chủ"
        icon={isHome ? <ActiveHomeIcon /> : <HomeIcon />}
        onClick={() => navigate('/home')}
      />

      <Input
        size="large"
        className="search-input"
        prefix={<SearchIcon />}
        value={inputValue}
        onChange={(e) => {
          setInputValue(e.target.value);
        }}
        placeholder="Tìm kiếm bài hát, danh sách phát, người dùng..."
      />
    </Space>
  );
});
