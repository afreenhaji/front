import React, { useContext, useState, useEffect } from 'react';
import { userDataContext } from '../context/UserContext';
import { FaCamera, FaUserCircle, FaRegClock } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import CreatePostModal from '../components/CreatePostModal';
import axios from 'axios';
import { authDataContext } from '../context/AuthContext';

function formatTime(dateStr) {
  const d = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now - d) / 1000);
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + ' min ago';
  if (diff < 86400) return Math.floor(diff / 3600) + ' hr ago';
  if (diff < 604800) return Math.floor(diff / 86400) + ' day(s) ago';
  return d.toLocaleDateString();
}

function Home() {
  const { userData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);
  const [showPostModal, setShowPostModal] = useState(false);
  const [posts, setPosts] = useState([]);  // Ensure posts is initialized as array
  const [loadingPosts, setLoadingPosts] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoadingPosts(true);
        const res = await axios.get(`${serverUrl}/api/post/feed`, {
          withCredentials: true,
        });
        console.log("Fetched Posts Data:", res.data);
        if (Array.isArray(res.data)) {
          setPosts(res.data);
        } else {
          setPosts([]);
        }
      } catch (error) {
        console.error('Failed to fetch posts:', error);
        setPosts([]);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [serverUrl, showPostModal]);

  return (
    <div className="relative w-full min-h-screen bg-[#f0efe7]">
      {showPostModal && <div className="fixed inset-0 bg-black bg-opacity-60 z-40" />}
      {showPostModal && <CreatePostModal onClose={() => setShowPostModal(false)} />}

      <div className="flex flex-col md:flex-row justify-center gap-6 pt-[80px] px-4 relative z-10">
        {/* Left Profile Card */}
        <div className="w-full md:w-[320px] bg-white rounded-2xl shadow-md overflow-hidden">
          <div className="relative">
            <div className="w-full h-[120px] bg-gray-200 relative">
              {userData?.coverImage && (
                <img
                  src={userData.coverImage}
                  alt="Cover"
                  className="w-full h-full object-cover"
                />
              )}
              <div
                className="absolute top-2 right-2 bg-white p-1 rounded-full shadow cursor-pointer"
                onClick={() => navigate('/edit-profile')}
              >
                <FaCamera size={16} />
              </div>
            </div>

            <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-10">
              {userData?.profileImage ? (
                <img
                  src={userData.profileImage}
                  alt="Profile"
                  className="w-[80px] h-[80px] rounded-full border-4 border-white object-cover shadow-md"
                />
              ) : (
                <FaUserCircle size={80} className="text-gray-400" />
              )}
              <div
                className="absolute bottom-0 right-0 bg-blue-600 w-5 h-5 rounded-full text-white text-xs flex justify-center items-center cursor-pointer"
                onClick={() => navigate('/edit-profile')}
              >
                +
              </div>
            </div>
          </div>

          <div className="mt-14 px-6 pb-6 text-center">
            <h2 className="text-xl font-semibold text-gray-800 capitalize">
              {userData ? `${userData.firstName || ''} ${userData.lastName || ''}` : 'Loading...'}
            </h2>
            {userData?.location && (
              <p className="text-sm text-gray-500 mt-1">{userData.location}</p>
            )}
            {userData?.email && (
              <p className="text-sm text-gray-500 mt-1">{userData.email}</p>
            )}
            {userData?.bio && (
              <p className="text-sm text-gray-700 mt-2 italic leading-relaxed">
                {userData.bio}
              </p>
            )}
            {userData?.skill?.length > 0 && (
              <div className="mt-4 text-left">
                <h3 className="text-sm font-semibold text-gray-700 mb-2 text-center">Skills</h3>
                <ul className="space-y-2">
                  {userData.skill.map((skill, index) => (
                    <li
                      key={index}
                      className="bg-blue-100 text-blue-800 text-sm font-medium px-3 py-1 rounded-md w-full text-center"
                    >
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <button
              onClick={() => navigate('/edit-profile')}
              className="w-full mt-5 bg-blue-600 text-white font-semibold rounded-full py-2 hover:bg-blue-700 transition"
            >
              Edit Profile
            </button>
          </div>
        </div>

        {/* Center Feed */}
        <div className="flex-1 flex flex-col gap-4">
          <div className="bg-white rounded-lg p-4 shadow-md flex items-center gap-3">
            {userData?.profileImage ? (
              <img
                src={userData.profileImage}
                alt="user"
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <FaUserCircle size={40} className="text-gray-400" />
            )}

            <div
              onClick={() => setShowPostModal(true)}
              className="flex-1 border border-gray-300 rounded-full px-4 py-2 cursor-pointer text-gray-600 hover:bg-gray-100"
            >
              Start a post
            </div>
          </div>

          <div className="bg-white min-h-[300px] rounded-2xl shadow-md p-4 space-y-6 overflow-y-auto max-h-[70vh]">
            {loadingPosts ? (
              <div className="text-center text-gray-500">Loading posts...</div>
            ) : Array.isArray(posts) && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post._id} className="border rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3">
                    {post.author?.profileImage ? (
                      <img
                        src={post.author.profileImage}
                        alt="Author"
                        className="w-10 h-10 rounded-full object-cover"
                      />
                    ) : (
                      <FaUserCircle size={40} className="text-gray-400" />
                    )}
                    <div>
                      <div className="font-semibold text-gray-800">
                        {post.author?.firstName} {post.author?.lastName}
                      </div>
                      {post.author?.headline && (
                        <div className="text-xs text-gray-500">{post.author.headline}</div>
                      )}
                      <div className="flex items-center text-xs text-gray-400">
                        <FaRegClock className="mr-1" />
                        {formatTime(post.createdAt)}
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 text-gray-700 whitespace-pre-line">{post.description}</div>
                  {post.image && (
                    <img
                      src={post.image}
                      alt="Post"
                      className="mt-4 max-h-80 w-full object-cover rounded"
                    />
                  )}
                </div>
              ))
            ) : (
              <div className="text-center text-gray-500">No posts yet.</div>
            )}
          </div>
        </div>

        {/* Right Sidebar (Widgets) */}
        <div className="w-full md:w-[250px] bg-white min-h-[400px] rounded-2xl shadow-md hidden md:block">
          {/* Sidebar widgets placeholder */}
        </div>
      </div>
    </div>
  );
}

export default Home;
