import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { DEFAULT_PAGE_COLOR } from "../../constants/spotify";

import { UserHeader } from "./UserHeader";
import { MyPlaylistsSection } from "./MyPlaylistsSection";

import { getMyProfile, getUserProfile } from "../../services/user.service";

const Profile = (props) => {
    const ref = useRef(null);

    const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            if (id) {
                const res = await getUserProfile(id);
                setProfile(res);
            } else {
                const res = await getMyProfile();
                setProfile(res);
            }
        } catch (error) {
            console.error("Error fetching profile:", error);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchProfile();
    }, [id])

    if (loading || !profile) {
        return <div className='Profile-section'>Loading...</div>;
    }

    return (
        <div className='Profile-section' ref={ref}>
            <UserHeader color={color} profile={profile.user}/>

            <div
            style={{
                padding: '20px 15px',
                background: `linear-gradient(${color} -50%, ${DEFAULT_PAGE_COLOR} 90%)`,
            }}
            >
                <MyPlaylistsSection playlists={profile.playlist}/>
            </div> 
        </div>
    );
};

export default Profile;
