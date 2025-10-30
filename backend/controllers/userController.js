import asyncHandler from '../middleware/asyncHandler.js';
import generateToken from '../utils/generateToken.js';
import validator from 'validator';

const authUser = asyncHandler(async (req, res) => {
	const { email, password } = req.body;
	if (user && (await user.matchPassword(password))) {
		generateToken(res, user._id);

		res.json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} else {
		res.status(401);
		throw new Error('Wrong email or password');
	}
});

const registerUser = asyncHandler(async (req, res) => {
	const { email, password, name } = req.body;

	if (
		!validator.isStrongPassword(password, {
			minLength: 8,
			minLowercase: 1,
			minUppercase: 1,
			minNumbers: 1,
			minSymbols: 1
		})
	) {
		res.status(400);
		throw new Error('Min 8 chars for password, upper, lower, number and symbol');
	}

	const userExist = await User.findOne({ email });

	if (userExist) {
		res.status(400);
		throw new Error('User already exist');
	}

	const user = await User.create({
		name,
		email,
		password
	});

	if (user) {
		generateToken(res, user._id);
		res.status(201).json({
			_id: user._id,
			name: user.name,
			email: user.email,
			isAdmin: user.isAdmin
		});
	} else {
		res.status(400);
		throw new Error('Invalid user data');
	}
});
