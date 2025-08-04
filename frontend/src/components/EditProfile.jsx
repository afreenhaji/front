import React, { useState, useContext, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { userDataContext } from '../context/UserContext';
import { authDataContext } from '../context/AuthContext';
import axios from 'axios';
import { IoMdClose } from 'react-icons/io';
import { FaUserCircle, FaCamera, FaTimes } from 'react-icons/fa';

function EditProfile() {
  const navigate = useNavigate();
  const { userData, fetchUserData } = useContext(userDataContext);
  const { serverUrl } = useContext(authDataContext);

  // State Variables
  const [headline, setHeadline] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userName, setUserName] = useState('');
  const [location, setLocation] = useState('');
  const [skills, setSkills] = useState([]);
  const [newSkill, setNewSkill] = useState('');
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);
  const [profileImage, setProfileImage] = useState('');
  const [coverImage, setCoverImage] = useState('');
  const [email, setEmail] = useState('');
  const [bio, setBio] = useState('');

  useEffect(() => {
    if (userData) {
      setHeadline(userData.headline || '');
      setFirstName(userData.firstName || '');
      setLastName(userData.lastName || '');
      setUserName(userData.userName || '');
      setLocation(userData.location || '');
      setSkills(userData.skill || []);
      setEducation(userData.education || []);
      setExperience(userData.experience || []);
      setProfileImage(userData.profileImage || '');
      setCoverImage(userData.coverImage || '');
      setEmail(userData.email || '');
      setBio(userData.bio || '');
    }
  }, [userData]);

  const profileInputRef = useRef();
  const coverInputRef = useRef();

  // Image Upload
  const handleImageUpload = async (file, type) => {
    try {
      const formData = new FormData();
      formData.append('image', file);
      const endpoint = type === 'profile' ? '/api/user/upload-profile' : '/api/user/upload-cover';
      const res = await axios.post(`${serverUrl}${endpoint}`, formData, {
        withCredentials: true,
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return res.data.url;
    } catch (error) {
      console.error('Image upload failed', error);
      alert('Image upload failed. Please try again.');
      return '';
    }
  };

  const handleSave = async () => {
    const updatedUser = {
      headline,
      firstName,
      lastName,
      userName,
      location,
      skill: skills,
      education,
      experience,
      profileImage,
      coverImage,
      email,
      bio,
    };
    try {
      await axios.put(`${serverUrl}/api/user/update`, updatedUser, { withCredentials: true });
      if (fetchUserData) await fetchUserData();
      navigate(-1);
    } catch (error) {
      console.error('Failed to save profile', error);
      alert('Failed to save profile. Please try again.');
    }
  };

  const handleAddSkill = () => {
    if (newSkill.trim()) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const handleAddEducation = () => {
    setEducation([...education, { college: '', degree: '', fieldOfStudy: '' }]);
  };

  const handleEducationChange = (index, field, value) => {
    const updated = [...education];
    updated[index][field] = value;
    setEducation(updated);
  };

  const removeEducation = (index) => {
    setEducation(education.filter((_, i) => i !== index));
  };

  const handleAddExperience = () => {
    setExperience([...experience, { title: '', company: '', description: '' }]);
  };

  const handleExperienceChange = (index, field, value) => {
    const updated = [...experience];
    updated[index][field] = value;
    setExperience(updated);
  };

  const removeExperience = (index) => {
    setExperience(experience.filter((_, i) => i !== index));
  };

  return (
    <div className="w-full min-h-screen bg-[#f0efe7] flex justify-center pt-[80px] px-4">
      <div className="w-full max-w-3xl bg-white rounded-lg shadow-lg p-6 relative mt-10">
            <button
        className="absolute top-4 right-4 md:top-6 md:right-6 text-gray-700 hover:text-black bg-white rounded-full shadow p-1 z-50"
        onClick={() => navigate(-1)}
        aria-label="Close Edit Profile"
      >
        <IoMdClose size={24} />
      </button>
        {/* Cover Image */}
<div className="w-full h-[100px] bg-gray-300 rounded relative overflow-hidden">
  {coverImage && (
    <img src={coverImage} className="w-full h-full object-cover rounded" alt="Cover" />
  )}
  <div
    onClick={() => coverInputRef.current.click()}
    className="absolute bottom-2 right-2 bg-white p-1 rounded-full cursor-pointer shadow-md"
  >
    <FaCamera size={16} />
    <input
      ref={coverInputRef}
      type="file"
      className="hidden"
      onChange={async (e) => {
        const file = e.target.files[0];
        const url = await handleImageUpload(file, 'cover');
        if (url) setCoverImage(url);
      }}
      accept="image/*"
    />
  </div>
</div>


        {/* Profile Image */}
        <div className="relative w-[80px] h-[80px] -mt-10 mx-auto">
          {profileImage ? (
            <img src={profileImage} className="w-full h-full rounded-full border-4 border-white object-cover shadow-md" alt="Profile" />
          ) : (
            <FaUserCircle size={80} className="text-gray-400" />
          )}
          <div
            onClick={() => profileInputRef.current.click()}
            className="absolute bottom-0 right-0 bg-blue-600 w-6 h-6 rounded-full text-white text-xs flex justify-center items-center cursor-pointer"
          >
            +
          </div>
          <input
            ref={profileInputRef}
            type="file"
            className="hidden"
            onChange={async (e) => {
              const file = e.target.files[0];
              const url = await handleImageUpload(file, 'profile');
              if (url) setProfileImage(url);
            }}
            accept="image/*"
          />
        </div>

        {/* Editable Fields */}
        <div className="mt-6 space-y-4">
          <input value={firstName} onChange={(e) => setFirstName(e.target.value)} placeholder="First Name" className="w-full border px-3 py-2 rounded" />
          <input value={lastName} onChange={(e) => setLastName(e.target.value)} placeholder="Last Name" className="w-full border px-3 py-2 rounded" />
          <input value={userName} onChange={(e) => setUserName(e.target.value)} placeholder="Username" className="w-full border px-3 py-2 rounded" />
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" className="w-full border px-3 py-2 rounded" />
          <input value={headline} onChange={(e) => setHeadline(e.target.value)} placeholder="Headline" className="w-full border px-3 py-2 rounded" />
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full border px-3 py-2 rounded" />
          <textarea value={bio} onChange={(e) => setBio(e.target.value)} placeholder="Bio" className="w-full border px-3 py-2 rounded resize-none" />

          {/* Skills Section */}
          <div>
            <label className="font-semibold">Skills</label>
            <div className="flex gap-2 mt-1">
              <input
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                placeholder="Enter skill"
                className="flex-1 border px-3 py-2 rounded"
              />
              <button onClick={handleAddSkill} className="px-3 py-2 border border-blue-500 text-blue-500 rounded">Add</button>
            </div>
            <div className="flex flex-wrap mt-2 gap-2">
              {skills.map((skill, index) => (
                <div key={index} className="flex items-center bg-gray-100 px-2 py-1 rounded-full">
                  {skill}
                  <FaTimes size={14} className="ml-2 cursor-pointer text-red-500" onClick={() => handleRemoveSkill(index)} />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Save Button */}
        <div className="mt-6 text-center">
          <button onClick={handleSave} className="bg-blue-500 text-white px-6 py-2 rounded-full hover:bg-blue-600 transition">
            Save Profile
          </button>
        </div>
      </div>
    </div>
  );
}

export default EditProfile;
