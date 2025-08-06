import React, { useState, useRef, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userDataContext } from "../context/UserContext";
import { authDataContext } from "../context/AuthContext";
import { IoSearchSharp } from "react-icons/io5";
import { AiFillHome } from "react-icons/ai";
import { FaUserFriends, FaUserCircle } from "react-icons/fa";
import { IoMdNotifications } from "react-icons/io";


function Nav() {
  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();
  const navigate = useNavigate();


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);


  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout Failed:", error);
    }
  };


  return (
    <div className="w-full h-[60px] bg-white fixed top-0 shadow flex justify-between items-center px-4 md:px-10 z-50">
     
      {/* Left Section: Logo + Search */}
      <div className="flex items-center gap-3">
        {/* Centered (or left) WorkNet title */}
        <h1
          onClick={() => navigate("/")}
          className="text-2xl font-extrabold text-blue-600 select-none cursor-pointer"
          style={{
            fontFamily: "'Montserrat', sans-serif",
            letterSpacing: "0.1em",
            userSelect: "none",
          }}
        >
          WorkNet
        </h1>

        {/* Optional: Search bar */}
        <div className="hidden md:flex items-center bg-gray-100 rounded px-3 py-1 ml-6 w-[250px] md:w-[350px]">
          <IoSearchSharp className="text-gray-500" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 bg-transparent outline-none text-sm w-full"
          />
        </div>
      </div>


      {/* Right Section: Icons and Profile Dropdown */}
      <div className="flex items-center gap-5 md:gap-6 relative" ref={dropdownRef}>
        {/* Home */}
        <div className="hidden md:flex flex-col items-center text-gray-700 hover:text-black cursor-pointer">
          <AiFillHome size={20} />
          <span className="text-xs" onClick={()=> navigate('/')}>Home</span>
        </div>


        {/* My Network */}
        <div className="hidden md:flex flex-col items-center text-gray-700 hover:text-black cursor-pointer">
          <FaUserFriends size={20} />
          <span className="text-xs">My Network</span>
        </div>


        {/* Notifications */}
        <div className="flex flex-col items-center text-gray-700 hover:text-black cursor-pointer">
          <IoMdNotifications size={20} />
          <span className="text-xs">Notifications</span>
        </div>


        {/* Profile Dropdown */}
        <div
          className="flex flex-col items-center text-gray-700 hover:text-black cursor-pointer"
          onClick={() => setDropdownOpen(!dropdownOpen)}
        >
          {userData?.profileImage ? (
            <img
              src={userData.profileImage}
              alt="Profile"
              className="w-6 h-6 rounded-full object-cover"
            />
          ) : (
            <FaUserCircle size={22} />
          )}

          <span className="text-xs">Profile</span>
        </div>


        {/* Dropdown Menu */}
        {dropdownOpen && (
          <div className="absolute right-0 top-14 w-56 bg-white shadow-lg rounded-md py-4">
            <div className="flex flex-col items-center">
            {userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-12 h-12 rounded-full object-cover mb-2"
                />
              ) : (
                <FaUserCircle size={50} className="mb-2" />
              )}
              <div className="text-[19px] font-semibold text-gray-700">
                {userData
                  ? `${userData.firstName} ${userData.lastName}`
                  : "Loading..."}
              </div>
            </div>
            <div className="px-4 mt-4 space-y-2">
              <button className="w-full border border-blue-500 text-blue-500 rounded-full py-1 text-sm hover:bg-blue-50"
               onClick={()=>navigate("/Profiles")}>
                View Profile
              </button>
              <button
                onClick={handleLogout}
                className="w-full border border-red-500 text-red-500 rounded-full py-1 text-sm hover:bg-red-50 mt-2"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


export default Nav;
