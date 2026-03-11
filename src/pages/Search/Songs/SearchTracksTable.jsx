import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchTableHeader } from './SearchTableHeader';
import { SearchTableContent } from './SearchTableContent';

const SearchTracksTable = memo((props) => {
  const { tracks } = props;

  const total = tracks.length;

  const hasMore = tracks.length < total;

  return (
    <div>
      <div className='playlist-table'>
        <SearchTableHeader />
      </div>

      <div style={{ paddingBottom: 30 }}>
        <InfiniteScroll
          loader={null}
          hasMore={hasMore}
          scrollThreshold={0.4}
          dataLength={tracks.length}
        >
          <div>
            {tracks.map((song, index) => (
              <SearchTableContent song={song} key={song.id || song.song_id || index} index={index} />
            ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
});

export default SearchTracksTable;
