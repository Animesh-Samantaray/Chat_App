import React, { useState } from 'react';
import { useAuthStore } from '../store/useAuthStore.js';
import { Camera } from 'lucide-react';
import defaultLogo from './noUser.png';
const ProfilePage = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const { authUser, isUpdatingProfile , updateProfile } = useAuthStore();

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const base64Image = reader.result;
      setSelectedImage(base64Image);
      await updateProfile({ profilePic: base64Image });
    };
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="bg-gray-800 shadow-2xl rounded-2xl w-full max-w-sm p-6">
        
        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Profile</h1>
          <p className="text-gray-400 mt-1 text-sm">Manage your profile information</p>
        </div>

        {/* Profile Image */}
        <div className="flex flex-col items-center">
          <div className="relative w-28 h-28 group">
            <img
              src={selectedImage || authUser?.profilePic || defaultLogo}
              alt="Profile"
              className="w-full h-full object-cover rounded-full border-2 border-gray-700 shadow-lg transition-transform duration-300 group-hover:scale-105"
            />
            <label
              htmlFor="avatar-upload"
              className={`absolute bottom-0 right-0 bg-blue-600 hover:bg-blue-500 text-white p-2 rounded-full cursor-pointer shadow-lg transition-transform duration-200 ease-in-out hover:scale-110 ${
                isUpdatingProfile ? 'animate-pulse pointer-events-none' : ''
              }`}
            >
              <Camera className="w-5 h-5" />
              <input
                type="file"
                id="avatar-upload"
                className="hidden"
                accept="image/png, image/jpeg, image/jpg, image/*"
                disabled={isUpdatingProfile}
                onChange={handleImageUpload}
              />
            </label>
          </div>

          <p className="mt-2 text-xs text-gray-400 text-center">
            {isUpdatingProfile
              ? 'Uploading...'
              : 'Click the camera icon to update your profile picture'}
          </p>
        </div>

        
        <div className="mt-6 space-y-4">
          <div className="flex flex-col">
            <label className="text-gray-300 font-semibold text-sm">Name</label>
            <input
              type="text"
              value={authUser?.fullName || ''}
              disabled
              className="mt-1 p-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>

          <div className="flex flex-col">
            <label className="text-gray-300 font-semibold text-sm">Email</label>
            <input
              type="email"
              value={authUser?.email || ''}
              disabled
              className="mt-1 p-2 border rounded-lg bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder-gray-400"
            />
          </div>
        </div>

        {/* Member Info */}
        <div className="mt-6 text-center text-gray-400 text-sm">
          Member since: <span className="text-white">{authUser?.createdAt?.slice(0, 10) || 'N/A'}</span>
        </div>

      </div>
    </div>
  );
};

export default ProfilePage;
