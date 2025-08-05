import axios from 'axios';
import React, { createContext, useEffect, useState, useContext } from 'react';
import { authDataContext } from './AuthContext';

export const userDataContext = createContext();

function UserContext({ children }) {
    const [userData, setUserData] = useState(null);
    const { serverUrl } = useContext(authDataContext);
    const [loading, setLoading] = useState(true); // Track loading state

    const getCurrentUser = async () => {
        try {
            let result = await axios.get(`${serverUrl}/api/auth/currentuser`, {
                withCredentials: true
            });
            setUserData(result.data.user);
            console.log("User logged in:", result.data.user);
        } catch (error) {
            console.log("User not logged in");
            setUserData(null);
        } finally {
            setLoading(false);
        }
    };

    const fetchUserData = async () => {
        try {
          const res = await axios.get(`${serverUrl}/api/user/me`, { withCredentials: true });
          setUserData(res.data);
        } catch (err) {
          console.error("Failed to fetch user data", err);
        }
      };

    useEffect(() => {
        getCurrentUser(),fetchUserData();  // Run once when app loads
    }, []);

    return (
        <userDataContext.Provider value={{ userData, setUserData, loading , fetchUserData }}>
            {children}
        </userDataContext.Provider>
    );
}

export default UserContext;
