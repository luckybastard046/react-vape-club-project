import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import WrapperLogIn from "../../layout/Wrappers/WrapperLogIn/WrapperLogIn";

import { useAuth } from '../../appwrite/context/AuthContext'

const Profile = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const { name, prefs } = await client.users.get();
            setUser({
                name,
                avatar: prefs.avatar // URL to image  
            });
        };
        fetchUser();
    }, []);

    if (!user) return null;

    return (
        <>
            <WrapperLogIn>
                <img src={user.avatar} />
                <p>{user.name}</p>
            </WrapperLogIn>
        </>
    );
}

export default Profile
