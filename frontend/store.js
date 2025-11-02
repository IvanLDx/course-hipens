import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './slices/apiSlice';

const store = configureStore({
	reducer: {
		[apiSlice.reducerPath]: apiSlice.reducer
	},
	middleware: (getDefaultMidlleware) => getDefaultMidlleware().concat(apiSlice.middleware),
	devtools: true
});

export default store;
