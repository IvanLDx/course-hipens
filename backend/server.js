import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import paypalRoutes from './routes/paypalRoutes.js';
import cookieParser from 'cookie-parser';
import errorHandler from './middleware/errorHandler.js';
import uploadRoutes from './routes/uploadRoutes.js';
import cors from 'cors';

dotenv.config();
connectDB();

const app = express();

const port = 9090;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api/products', productRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/paypal', paypalRoutes);
app.use('/api/upload', uploadRoutes);

app.get('/api/config/paypal', (req, res) => {
	const clientId = process.env.PAYPAL_CLIENT_ID;
	if (!clientId) {
		res.status(500).json({
			error: 'Paypal client id is not configured'
		});
	}

	res.json({ clientId });
});

app.use(errorHandler);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
