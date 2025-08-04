# WorkNet - MERN Stack Social Network App

WorkNet is a LinkedIn-like professional networking platform built with the **MERN Stack** (MongoDB, Express, React, Node.js). Users can create profiles, post updates, and view public feeds.

---

## 🔥 Tech Stack

* **Frontend:** React.js, React Router, Axios
* **Backend:** Node.js, Express.js
* **Database:** MongoDB (Atlas)
* **Image Storage:** Cloudinary
* **Authentication:** JWT, Cookies
* **Deployment:** Vercel (Frontend) & Render (Backend)

---

## ✨ Features

* User Registration & Login (JWT Auth)
* Edit & View Profile (with Profile Image Upload)
* Public Feed to View & Create Posts
* Responsive UI (Mobile & Desktop)
* Cloudinary Integration for Image Uploads

---

## 🛠️ Local Setup Instructions

### Clone Repository

```bash
git clone https://github.com/afreenhaji/worknet-deploy.git
```

### Backend Setup

```bash
cd worknet-deploy/backend
npm install
```

Create a `.env` file in `/backend` with:

```
PORT=8000
MONGODB_URL=your_mongo_db_url
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_cloud_api_key
CLOUDINARY_API_SECRET=your_cloud_api_secret
```

Run backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd ../frontend
npm install
npm start
```

---

## 🌐 Live Demo

Frontend (Vercel): [https://work-net.vercel.app](#)
Backend (Render): [https://worknet-backend-n4mm.onrender.com](#)

---


## 👷‍♂️ Author

**Afreen Haji**
GitHub: [afreenhaji](https://github.com/afreenhaji)

---

## ⭐ Give a Star!

If you like this project, don’t forget to ⭐ the repo!
