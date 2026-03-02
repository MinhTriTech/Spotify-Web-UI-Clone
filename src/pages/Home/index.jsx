// import { memo, useEffect } from 'react';

// import HomePageContainer from './container';

// import { homeActions } from '../../store/slices/home';
// import { useAppDispatch, useAppSelector } from '../../store/store';

// const Home = memo((props) => {
//   const { container } = props;

//   const dispatch = useAppDispatch();
//   const user = useAppSelector((state) => !!state.auth.user);
//   useEffect(() => {
//     if (user) {
//       dispatch(homeActions.fetchTopTracks());
//     }
//     dispatch(homeActions.fecthFeaturedPlaylists());
//     dispatch(homeActions.fecthArtists());
//   }, [user, dispatch]);

//   return <HomePageContainer container={container} />;
// });

// export default Home;


import { useEffect, useState } from "react";
import { getMe } from "../../services/auth.service";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const [ userInfo, setUserInfo ] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const data = await getMe(); 
        setUserInfo(data);
      } catch (error) {
        console.log("Token lỗi hoặc hết hạn");
        localStorage.removeItem("token");
        navigate("/");
      }
    }

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <div style={{ padding: "40px" }}>
      <h1>Home Page</h1>

      {userInfo && (
        <div>
          <p>User ID: {userInfo.userId}</p>
          <p>{userInfo.message}</p>
        </div>
      )}

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default HomePage;