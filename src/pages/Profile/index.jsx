import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

import { DEFAULT_PAGE_COLOR } from "../../constants/spotify";

import UserHoverableMenu from "./scrollHoverable";
import { UserHeader } from "./UserHeader";
import { MyPlaylistsSection } from "./MyPlaylistsSection";

import { getMyProfile } from "../../services/user.service";

const Profile = (props) => {
    const ref = useRef(null);
    const [color, setColor] = useState(DEFAULT_PAGE_COLOR);

    const { id } = useParams();

    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const res = await getMyProfile();
                setProfile(res);
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchProfile();
    }, [id])

    if (loading || !profile) {
        return <div className='Profile-section'>Loading...</div>;
    }

    return (
        <div className='Profile-section' ref={ref}>
            <UserHoverableMenu color={color} container={props.container} sectionContainer={ref} profile={profile.user}/>

            <UserHeader color={color} profile={profile.user}/>

            <div
            style={{
                maxHeight: 323,
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
