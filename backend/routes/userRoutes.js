import express from 'express';
import {
	authUser,
	getRegisterUser,
	logoutUser,
	getUserProfile,
	updateUserProfile,
	getUsers,
	getUserById,
	updateUser,
	deleteUser
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').post(getRegisterUser).get(admin, protect, getUsers);

router.route('/logout', logoutUser);

router.post('/auth', authUser);

router.route('/profile').get(protect, getUserProfile).put(protect, updateUserProfile);

router.route('/:id').delete(admin, protect, deleteUser).get(admin, protect, getUserById).put(admin, protect, updateUser);

export default router;
