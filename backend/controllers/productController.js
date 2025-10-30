import asyncHandler from '../middleware/asyncHandler.js';
import Product from '../models/projectModel.js';

const getProduct = asyncHandler(async (req, res) => {
	const pageSize = 8;

	const page = Number(req.query.pageNumber) || 1;

	const keyword = req.query.keyword
		? {
				name: {
					$regex: req.query.keyword,
					$options: 'i'
				}
		  }
		: {};

	const count = await Product.countDocuments({ ...keyword });
	const products = await Product.find({ ...keyword })
		.limit(pageSize)
		.skip(pageSize * (page - 1));

	res.json({
		products,
		page,
		pages: Math.ceil(count / pageSize),
		total: count
	});
});

const getProductById = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		res.json(product);
	}
	res.status(404);
	throw new Error('Product not found');
});

const createProduct = asyncHandler(async (req, res) => {
	const product = new Product({
		name: 'Sample name',
		price: 0,
		image: '/uploads/sample.png',
		category: 'Sample Category',
		countInStock: 0,
		numReviews: 0,
		description: 'Sample description'
	});

	const createdProduct = await product.save();

	res.status(201).json(createdProduct);
});

const updateProduct = asyncHandler(async (req, res) => {
	const { name, price, description, image, category, countInStock } = req.body;

	const product = await Product.findById(req.params.id);

	if (product) {
		product.name = name;
		product.price = price;
		product.description = description;
		product.image = image;
		product.category = category;
		product.countInStock = countInStock;

		const updateProduct = await product.save();
		res.json(updateProduct);
	} else {
		res.status(404);
		throw new Error('Product not found');
	}
});

const deleteProduct = asyncHandler(async (req, res) => {
	const product = await Product.findById(req.params.id);

	if (product) {
		await Product.deleteOne({ _id: product._id });
		res.json({ message: 'Product successfully deleted' });
	} else {
		res.status(404);
		throw new Error('Proudct not found');
	}
});
