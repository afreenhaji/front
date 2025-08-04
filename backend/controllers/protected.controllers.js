import User from "../models/user.model.js";

export const getMyProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch profile" });
  }
};

export const updateMyProfile = async (req, res) => {
  try {
    const updates = req.body;
    const updated = await User.findByIdAndUpdate(req.user.id, updates, { new: true });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: "Failed to update profile" });
  }
};

export const uploadProfileImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No profile image uploaded' });

    const url = `${process.env.SERVER_URL}/public/${req.file.filename}`;
    await User.findByIdAndUpdate(req.user.id, { profileImage: url }, { new: true });

    return res.json({ url });
  } catch (err) {
    return res.status(500).json({ error: "Failed to upload profile image" });
  }
};

export const uploadCoverImage = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No cover image uploaded' });

    const url = `${process.env.SERVER_URL}/public/${req.file.filename}`;
    await User.findByIdAndUpdate(req.user.id, { coverImage: url }, { new: true });

    return res.json({ url });
  } catch (err) {
    return res.status(500).json({ error: "Failed to upload cover image" });
  }
};
