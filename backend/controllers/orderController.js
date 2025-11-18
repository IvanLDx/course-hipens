import asyncHandler from '../middleware/asyncHandler.js';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';
import { calcPrices } from '../utils/calcPrices.js';

// private user
const addOrderItem = asyncHandler(async (req, res) => {
	const { orderItems, shippingAddress, paymentMethod } = req.body;

	if (!orderItems || orderItems.length === 0) {
		res.status(400);
		throw new Error('No order items');
	}

	const itemsFromDB = await Product.find({
		_id: { $in: orderItems.map((x) => x._id) }
	});

	const dbOrderItems = orderItems.map((item) => {
		const dbItem = itemsFromDB.find((p) => p._id.toString() === item._id);

		if (!dbItem) {
			res.status(404);
			throw new Error(`Product not found: ${item._id}`);
		}

		return {
			...item,
			product: item._id,
			price: item.price,
			_id: undefined
		};
	});

	const prices = calcPrices(dbOrderItems);
	const order = new Order({
		orderItems: dbOrderItems,
		user: req.user._id,
		shippingAddress,
		paymentMethod,
		...prices
	});

	const createdOrder = await order.save();
	res.status(201).json(createdOrder);
});
