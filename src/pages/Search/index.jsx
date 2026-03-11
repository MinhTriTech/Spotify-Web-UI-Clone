import { useRef } from 'react';
import { Outlet } from 'react-router-dom';
import { DEFAULT_PAGE_COLOR } from '../../constants/spotify';
import { SearchHeader } from './SearchHeader';

const SearchContainer = (props) => {
  const ref = useRef(null);

  return (
    <div className="search-container" ref={ref}>
      <SearchHeader color={DEFAULT_PAGE_COLOR} sectionContainer={ref} container={props.container} />
      <div className='Search-Page'>
        <Outlet />
      </div>
    </div>
  );
};

export default SearchContainer;
