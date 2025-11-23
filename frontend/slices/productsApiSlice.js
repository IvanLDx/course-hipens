import { PRODUCT_URL } from '../constants/Urls';
import { apiSlice } from './apiSlice';

export const productsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getProducts: builder.query({
			query: ({ keyword, pageNumber }) => ({
				url: PRODUCT_URL,
				params: { keyword, pageNumber }
			}),
			keepUnusedDataFor: 5,
			providesTags: ['Product']
		}),
		getProductDetails: builder.query({
			query: (productId) => ({
				url: `${PRODUCT_URL}/${productId}`
			}),
			keepUnusedDataFor: 5,
			providesTags: ['Product']
		}),
		createReview: builder.mutation({
			query: (data) => ({
				url: `${PRODUCT_URL}/${data.productId}/reviews`,
				method: 'POST',
				body: data
			}),
			invalidatesTags: ['Product']
		}),
		deleteProduct: builder.mutation({
			query: (productId) => ({
				url: `${PRODUCT_URL}/${productId}`,
				method: 'DELETE'
			}),
			invalidatesTags: ['Product']
		}),
		updateProduct: builder.mutation({
			query: (data) => ({
				url: `${PRODUCT_URL}/${data.productId}`,
				method: 'PUT',
				body: data
			}),
			invalidatesTags: ['Product']
		}),
		uploadProductImage: builder.mutation({
			query: (data) => ({
				url: '/api/upload',
				method: 'POST',
				body: data
			})
		})
	})
});

export const {
	useGetProductsQuery,
	useGetProductDetailsQuery,
	useCreateReviewMutation,
	useDeleteProductMutation,
	useUpdateProductMutation,
	useUploadProductImageMutation
} = productsApiSlice;
