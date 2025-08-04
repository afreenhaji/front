import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { createPost, getAllPosts, getUserPosts } from "../controllers/postControllers.js";

const router = express.Router();

router.post("/create", isAuth, createPost);
router.get("/feed", isAuth, getAllPosts);
router.get("/user/:userId", isAuth, getUserPosts);

export default router;
