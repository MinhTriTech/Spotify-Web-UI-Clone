import { memo } from 'react';
import InfiniteScroll from 'react-infinite-scroll-component';
import { SearchTableHeader } from './SearchTableHeader';
import { SearchTableContent } from './SearchTableContent';

const SearchTracksTable = memo((props) => {
  const tracks = [
    {
      _id: '1',
      title: 'Blinding Lights',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 200,
      url: 'https://example.com/song1.mp3',
      image: 'https://picsum.photos/200?random=1'
    },
    {
      _id: '2',
      title: 'Save Your Tears',
      artist: 'The Weeknd',
      album: 'After Hours',
      duration: 215,
      url: 'https://example.com/song2.mp3',
      image: 'https://picsum.photos/200?random=2'
    },
    {
      _id: '3',
      title: 'Levitating',
      artist: 'Dua Lipa',
      album: 'Future Nostalgia',
      duration: 203,
      url: 'https://example.com/song3.mp3',
      image: 'https://picsum.photos/200?random=3'
    }
  ];

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
