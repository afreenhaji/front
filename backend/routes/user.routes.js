import express from "express";
import { isAuth } from "../middlewares/isAuth.js";
import { updateBio } from "../controllers/userControllers.js";

const router = express.Router();

router.put("/update-bio", isAuth, updateBio);

export default router;
