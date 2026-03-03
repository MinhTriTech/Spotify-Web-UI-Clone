import { Link } from "react-router-dom";

function PlaylistCard({ playlist }) {
  return (
    <Link to={`/playlist/${playlist._id}`}>
      <div>
        <h3>{playlist.title}</h3>
      </div>
    </Link>
  );
}

export default PlaylistCard;