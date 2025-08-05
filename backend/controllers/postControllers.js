import Post from "../models/Postmodel.js";

export const createPost = async (req, res) => {
  try {
    const { description } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const newPost = await Post.create({
      author: req.user.id,
      description: description || "",
    });

    await newPost.populate("author", "firstName lastName profileImage headline");

    return res.status(201).json(newPost);
  } catch (error) {
    console.error("Create Post Error:", error);
    return res.status(500).json({ error: error.message });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName profileImage headline");
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Get All Posts Error:", error);
    return res.status(500).json({ error: "Could not fetch posts" });
  }
};
export const getUserPosts = async (req, res) => {
  try {
    const userId = req.params.userId;
    const posts = await Post.find({ author: userId })
      .sort({ createdAt: -1 })
      .populate("author", "firstName lastName profileImage headline");

    return res.status(200).json(posts);
  } catch (error) {
    console.error("Get User Posts Error:", error);
    return res.status(500).json({ error: "Could not fetch user posts" });
  }
};
