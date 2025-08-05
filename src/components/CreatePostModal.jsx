import React, { useContext, useState } from 'react';
import { userDataContext } from '../context/UserContext';
import axios from 'axios';

function CreatePostModal({ onClose }) {
  const { userData } = useContext(userDataContext);
  const [description, setDescription] = useState('');

  const serverUrl = process.env.REACT_APP_API_URL;  // <-- Added this line

  const handlePost = async () => {
    try {
      await axios.post(
        `${serverUrl}/api/post/create`,  // <-- Dynamic URL
        { description },
        { withCredentials: true }  // <-- Important for cookies
      );
      onClose(); // Close modal on success
    } catch (error) {
      console.error("Post creation failed", error.response ? error.response.data : error.message); // <-- Better error logging
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <img src={userData?.profileImage} className="w-10 h-10 rounded-full object-cover" alt="profile" />
            <p className="font-semibold">{userData?.firstName} {userData?.lastName}</p>
          </div>
          <button onClick={onClose} className="text-xl font-bold">&times;</button>
        </div>
        <textarea
          className="w-full border rounded-md p-2 min-h-[100px]"
          placeholder="What do you want to talk about?"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button
          onClick={handlePost}
          className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 float-right"
        >
          Post
        </button>
      </div>
    </div>
  );
}

export default CreatePostModal;
