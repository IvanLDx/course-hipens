import express from 'express';
import productRoutes from './routes/productRoutes.js';

const app = express();

const port = 9090;

app.use('/api/products', productRoutes);

app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
