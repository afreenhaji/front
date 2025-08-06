import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import { FaCamera, FaUserCircle } from 'react-icons/fa';

function Profiles() {
  const { userData, setUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);  // ✅ Correct Usage
  const [userPosts, setUserPosts] = useState([]);
  const [isEditingBio, setIsEditingBio] = useState(false);
  const [newBio, setNewBio] = useState(userData?.bio || "");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserPosts = async () => {
      try {
        const res = await axios.get(`${serverUrl}/api/post/user/${userData._id}`, { withCredentials: true });
        setUserPosts(res.data);
      } catch (error) {
        console.error("Failed to fetch user posts", error);
      }
    };

    if (userData?._id) {
      fetchUserPosts();
    }
  }, [userData, serverUrl]);

  const handleUpdateBio = async () => {
    try {
      const res = await axios.put(`${serverUrl}/api/user/update-bio`,
        { bio: newBio },
        { withCredentials: true }
      );
      console.log("Bio Updated:", res.data.user);
      setUserData(res.data.user);
      setIsEditingBio(false);
    } catch (error) {
      console.error("Failed to update bio", error);
    }
  };

  return (
    <div className='w-full min-h-screen bg-[#f0efe7] flex justify-center pt-[100px]'>
      <div className='w-full max-w-[900px] bg-white rounded-md shadow-md relative'>

        {/* Cover Image */}
        <div className="w-full h-[200px] bg-gray-300 relative rounded-t-md overflow-hidden">
          {userData?.coverImage && (
            <img
              src={userData.coverImage}
              alt="Cover"
              className="w-full h-full object-cover"
            />
          )}
          <div
            className="absolute top-3 right-3 bg-white p-2 rounded-full shadow cursor-pointer"
            onClick={() => navigate('/edit-profile')}
          >
            <FaCamera size={18} />
          </div>
        </div>

        {/* Profile Image */}
        <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="relative w-[100px] h-[100px]">
            {userData?.profileImage ? (
              <img
                src={userData.profileImage}
                alt="Profile"
                className="w-full h-full rounded-full border-4 border-white object-cover shadow-md"
              />
            ) : (
              <FaUserCircle size={100} className="text-gray-400" />
            )}
            <div
              className="absolute bottom-0 right-0 bg-blue-600 w-6 h-6 rounded-full text-white text-xs flex justify-center items-center cursor-pointer"
              onClick={() => navigate('/edit-profile')}
            >
              +
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="mt-16 px-6 pb-6 text-center">
          <h2 className="text-2xl font-semibold text-gray-800 capitalize">
            {userData ? `${userData.firstName} ${userData.lastName}` : 'Loading...'}
          </h2>
          {userData?.location && <p className="text-sm text-gray-500 mt-1">{userData.location}</p>}
          {userData?.email && <p className="text-sm text-gray-500 mt-1">{userData.email}</p>}
        </div>

        {/* Bio Section */}
        <div className="mt-6 px-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-2 flex items-center justify-between">
            About
            <button
              onClick={() => setIsEditingBio(true)}
              className="text-blue-600 text-sm hover:underline"
            >
              Edit
            </button>
          </h3>

          {isEditingBio ? (
            <div>
              <textarea
                className="w-full border rounded-md p-2 min-h-[80px]"
                value={newBio}
                onChange={(e) => setNewBio(e.target.value)}
              />
              <div className="mt-2 flex gap-2">
                <button
                  onClick={handleUpdateBio}
                  className="bg-blue-600 text-white px-4 py-1 rounded hover:bg-blue-700"
                >
                  Save
                </button>
                <button
                  onClick={() => { setIsEditingBio(false); setNewBio(userData.bio || ""); }}
                  className="border border-gray-400 px-4 py-1 rounded hover:bg-gray-100"
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <p className="text-gray-700 leading-relaxed">{userData?.bio || "No bio added yet."}</p>
          )}
        </div>

        {/* User's Posts Feed */}
        <div className="px-6 pb-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Posts</h3>
          {userPosts.length > 0 ? (
            userPosts.map((post) => (
              <div key={post._id} className="border rounded-md p-4 mb-4 shadow-sm">
                <div className="flex items-center gap-3 mb-2">
                  <img src={post.author.profileImage} className="w-10 h-10 rounded-full object-cover" alt="" />
                  <div>
                    <p className="font-semibold">{post.author.firstName} {post.author.lastName}</p>
                    <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
                  </div>
                </div>
                <p className="text-gray-800">{post.description}</p>
              </div>
            ))
          ) : (
            <p className="text-gray-500">No posts yet.</p>
          )}
        </div>

      </div>
    </div>
  );
}

export default Profiles;
