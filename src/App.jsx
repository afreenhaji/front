import React, { useContext } from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Signup from './pages/Signup';
import { userDataContext } from './context/UserContext';
import EditProfile from "./components/EditProfile";
import Profiles from './pages/Profiles';
import Layout from './components/Layout';

export default function App() {
    const { userData, loading } = useContext(userDataContext);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen text-xl">
                Loading...
            </div>
        );
    }

    return (
        <Routes>
            <Route path="/" element={userData ? <Layout /> : <Navigate to="/login" replace />} >
                <Route index element={<Home />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/edit-profile" element={<EditProfile />} />
            </Route>

            <Route path="/signup" element={!userData ? <Signup /> : <Navigate to="/" replace />} />
            <Route path="/login" element={!userData ? <Login /> : <Navigate to="/" replace />} />
        </Routes>
    );
}
