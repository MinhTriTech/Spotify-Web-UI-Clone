import { Link } from "react-router-dom";
import { GridItemList } from "../Lists/GridItemList";

function PlaylistCard({ playlist }) {
  return (
    // <Link to={`/playlist/${playlist._id}`}>
    //   <div>
    //     <h3>{playlist.title}</h3>
    //   </div>
    // </Link>
    <div className='home'>
      <GridItemList
        title={null}
      />
    </div>
  );
}

export default PlaylistCard;