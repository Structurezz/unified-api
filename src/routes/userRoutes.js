import express from 'express';
import userController from '../app/controllers/userController.js';
import authMiddleware from '../app/middleware/authMiddleware.js';

const router = express.Router();

router.post('/signup', userController.createUser); // Signup route
router.post('/login', userController.loginUser);   // Login route
router.get('/', userController.getAllUsers);
router.get('/:userId', userController.getUserById);
router.put('/:userId', userController.updateUser);
router.delete('/:userId', userController.deleteUser);

router.use(authMiddleware);

router.post('/forgot-password', userController.requestPasswordReset);
router.post('/reset-password', userController.resetPassword);

// Middleware to verify JWT token before accessing protected routes





export default router;
