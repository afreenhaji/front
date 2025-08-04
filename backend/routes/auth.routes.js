import express from 'express';
import { login, signUp, logout, currentUser } from '../controllers/auth.controllers.js';
import { isAuth } from '../middlewares/isAuth.js';  // Import your middleware

const router = express.Router();

router.post('/login', login);        // Public - Login Route
router.post('/signup', signUp);      // Public - Signup Route
router.get('/logout', logout);       // Public - Logout Route
router.get('/currentuser', isAuth, currentUser);  // Protected Route

export default router;
