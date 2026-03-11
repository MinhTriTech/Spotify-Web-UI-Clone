import { Divider } from "antd";

import { DEFAULT_PAGE_COLOR } from "../../constants/spotify";

import InfiniteScroll from 'react-infinite-scroll-component';
import PlaylistControls from "./PlaylistControls";
import { PlaylistTableHeader } from "./PlaylistTableHeader";
import SongView from "./Song";

const PlaylistList = (({ color, playlist, tracks = [] }) => {
    const hasTracks = !!tracks?.length;

    return (
        <div
        className='playlist-list'
        style={{
            maxHeight: 323,
            background: `linear-gradient(${color} -50%, ${DEFAULT_PAGE_COLOR} 90%)`,
        }}
        >
        <PlaylistControls playlist={playlist} tracks={tracks}/>
        {hasTracks ? (
            <div className='playlist-table'>
            <PlaylistTableHeader />
            </div>
        ) : (
            <Divider />
        )}

        <InfiniteScroll
            loader={null}
            scrollThreshold={0.5}
            dataLength={tracks.length}
        >
            {hasTracks ? (
            <div style={{ paddingBottom: 30 }}>
                <div>
                    {tracks.map((song, index) => (
                        <SongView song={song} key={`${song._id}`} index={index} />
                    ))}
                </div>
            </div>
            ) : null}
        </InfiniteScroll>
        </div>
    );
});

export default PlaylistList;