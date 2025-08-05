import uploadOnCloudinary from "../config/cloudinary.js";
import User from "../models/user.model.js";

// Get My Profile
export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

// Update Profile Info (name, location, bio, etc.)
export const updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updated = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

// Upload Profile Image to Cloudinary
export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No profile image uploaded' });

    const localFilePath = req.file.path;
    const imageUrl = await uploadOnCloudinary(localFilePath);

    if (!imageUrl) {
      return res.status(500).json({ error: "Image upload to Cloudinary failed" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profileImage: imageUrl },
      { new: true }
    );

    res.json({ message: "Profile image updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload profile image" });
  }
};

// Upload Cover Image to Cloudinary
export const uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No cover image uploaded' });

    const localFilePath = req.file.path;
    const imageUrl = await uploadOnCloudinary(localFilePath);

    if (!imageUrl) {
      return res.status(500).json({ error: "Image upload to Cloudinary failed" });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { coverImage: imageUrl },
      { new: true }
    );

    res.json({ message: "Cover image updated", user });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to upload cover image" });
  }
};
