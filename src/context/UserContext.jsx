import axios from 'axios';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { authDataContext } from './AuthContext';

export const userDataContext = createContext();

function UserContext({ children }) {
    const [userData, setUserData] = useState(null);
    const { serverUrl } = useContext(authDataContext);
    const [loading, setLoading] = useState(true);

    const fetchUserData = async () => {
        try {
            const res = await axios.get(`${serverUrl}/api/user/me`, { withCredentials: true });
            setUserData(res.data);
            console.log("User data fetched:", res.data);
        } catch (err) {
            console.error("User not logged in or failed to fetch user data", err);
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserData();
    }, []);

    return (
        <userDataContext.Provider value={{ userData, setUserData, loading, fetchUserData }}>
            {children}
        </userDataContext.Provider>
    );
}

export default UserContext;
