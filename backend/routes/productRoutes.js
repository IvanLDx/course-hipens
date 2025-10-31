import express from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct, createProductReview } from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/').get(getProducts).post(admin, protect, createProduct);

router.route('/:id').get(getProductById).put(admin, protect, updateProduct).delete(admin, protect, deleteProduct);

router.route('/:id/reviews').post(protect, createProductReview);

export default router;
