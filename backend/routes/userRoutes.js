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

const router = express.Router();

router.route('/').post(getRegisterUser).get(getUsers);

router.route('/logout', logoutUser);

router.post('/auth', authUser);

router.route('/profile').get(getUserProfile).put(updateUserProfile);

router.route('/:id').delete(deleteUser).get(getUserById).put(updateUser);

export default router;
