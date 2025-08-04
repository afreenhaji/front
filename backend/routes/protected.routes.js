import express from "express";
import {
  getMyProfile,
  updateMyProfile,
  uploadProfileImage,
  uploadCoverImage,
} from "../controllers/protected.controllers.js";
import { isAuth } from "../middlewares/isAuth.js";
import upload from "../middlewares/multer.js";

const router = express.Router();

router.get("/me", isAuth, getMyProfile);
router.put("/update", isAuth, updateMyProfile);
router.post("/upload-profile", isAuth, upload.single("image"), uploadProfileImage);
router.post("/upload-cover", isAuth, upload.single("image"), uploadCoverImage);

export default router;
