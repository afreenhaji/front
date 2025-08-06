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
    const { userData } = useContext(userDataContext);  // ✅ Removed loading

    return (
        <Routes>
            <Route path='/' element={userData ? <Layout /> : <Navigate to="/login" />}>
                <Route index element={<Home />} />
                <Route path="/profiles" element={<Profiles />} />
                <Route path="/edit-profile" element={<EditProfile />} />
            </Route>
            <Route path='/signup' element={userData ? <Navigate to="/" /> : <Signup />} />
            <Route path='/login' element={userData ? <Navigate to="/" /> : <Login />} />
        </Routes>
    );
}
