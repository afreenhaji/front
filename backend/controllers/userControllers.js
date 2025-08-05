import User from "../models/UserModel.js";

export const updateBio = async (req, res) => {
  try {
    const { bio } = req.body;

    // Ensure the user is authenticated (from isAuth middleware)
    const userId = req.user.id;

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { bio: bio },
      { new: true }  // Return the updated user document
    );

    if (!updatedUser) {
      return res.status(404).json({ error: "User not found" });
    }

    return res.status(200).json({ message: "Bio updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Update Bio Error:", error);
    return res.status(500).json({ error: "Failed to update bio" });
  }
};
