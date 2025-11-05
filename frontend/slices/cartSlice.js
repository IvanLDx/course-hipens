import { createSlice } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { updateCart } from '../constants/CartUtils';

const initialState = {
	cartItems: [],
	shippingAddress: {},
	paymentMethod: 'PayPal',
	itemsPrice: '0.00',
	shippingPrice: '0.00',
	taxPrice: '0.00',
	totalPrice: '0.00'
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setCartFromStorage: (state, action) => {
			return action.payload;
		},
		addToCart: (state, action) => {
			const { user, rating, numReviews, reviews, ...item } = action.payload;
			const existItem = state.cartItems.find((x) => x._id === item._id);

			if (existItem) {
				state.cartItems = state.cartItems.map((x) => (x._id === existItem._id ? item : x));
			} else {
				state.cartItems = [...state.cartItems, item];
			}

			return updateCart(state);
		},
		removeFromCart: (state, action) => {
			state.cartItems = state.cartItems.filter((x) => x._id !== action.payload);
			return updateCart(state);
		},
		saveShippingAddress: (state, action) => {
			state.shippingAddress = action.payload;
			AsyncStorage.setItem('cart', JSON.stringify(state));
		},
		savePaymentMethod: (state, action) => {
			state.paymentMethod = action.payload;
			AsyncStorage.setItem('cart', JSON.stringify(state));
		},
		clearCartItems: (state) => {
			state.cartItems = [];
			AsyncStorage.setItem('cart', JSON.stringify(state));
		},

		resetCart: (state) => {
			const newState = initialState;
			AsyncStorage.removeItem('cart');
			return newState;
		}
	}
});

export const { setCartFromStorage, addToCart, removeFromCart, savePaymentMethod, saveShippingAddress, clearCartItems, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
