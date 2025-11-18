import express from 'express';
import paypalClient from '../utils/paypalClient.js';
import paypal from '@paypal/checkout-server-sdk';
import dotenv from 'dotenv';

const router = express.Router();

router.get('/config', (req, res) => {
	res.send({
		clientId: process.env.PAYPAL_CLIENT_ID
	});
});

router.post('/create-order', async (req, res) => {
	try {
		const { amount } = req.body;

		if (!amount || isNAN(amount) || amount <= 0) {
			return res.status(400).json({
				error: 'Invalid amount provided'
			});
		}

		const request = new paypal.orders.OrdersCreateRequest();

		request.prefer('return=representation');
		request.requestBody({
			intent: 'CAPTURE',
			purchase_units: [
				{
					amount: {
						currency_code: 'USD',
						value: amount.toString()
					}
				}
			]
		});

		const response = await paypalClient.execute(request);

		res.status(200).json({
			id: response.result.id,
			status: response.result.status
		});
	} catch (error) {
		res.status(500).json({
			error: 'Failed to create paypal order',
			details: error.message
		});
	}
});
