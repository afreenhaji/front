// path: backend/index.js
import express from "express";
import authRouter from "./routes/auth.routes.js";
import protectedRouter from "./routes/protected.routes.js";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import postRouter from './routes/post.routes.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// Recommended CORS config for secure frontend/backend communication
app.use(cors({
  origin: process.env.CLIENT_URL || '*', // Or set specific frontend URL
  credentials: true,
}));

// Static folder for image serving
app.use("/public", express.static("public"));

// API Routes
app.use("/api/auth", authRouter);
app.use("/api/user", protectedRouter);
app.use("/api/post", postRouter);

// Health check route (optional)
app.get("/", (req, res) => {
  res.send("✅ WorkNet backend is up and running!");
});

// DB connection and server start
connectDb()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("❌ DB connection failed:", error.message);
  });
