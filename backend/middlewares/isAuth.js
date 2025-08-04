import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const isAuth = async (req, res, next) => {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: 'No token found. Please login.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.id).select('-password');  // Get full user data without password
        if (!user) {
            return res.status(401).json({ message: 'User not found. Please login again.' });
        }

        req.user = user;  // Attach full user object
        next();
    } catch (error) {
        console.error('Auth Middleware Error:', error);
        return res.status(401).json({ message: 'Invalid token. Please login again.' });
    }
};
