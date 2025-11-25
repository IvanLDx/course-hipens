import {
	StyleSheet,
	Text,
	View,
	TextInput,
	ScrollView,
	ActivityIndicator,
	Image,
	Platform,
	SafeAreaView,
	KeyboardAvoidingView,
	TouchableOpacity
} from 'react-native';
import React, { useState, useEffect } from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import Toast from 'react-native-toast-message';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useGetProductDetailsQuery, useUpdateProductMutation, useUploadProductImageMutation } from '../../../slices/productsApiSlice';
import * as ImagePicker from 'expo-image-picker';
import { Colors } from '../../../constants/Utils';
import { BASE_URL } from '../../../constants/Urls';
import FormContainer from '../../../components/FormContainer';

const ProductEditScreen = () => {
	const router = useRouter();
	const params = useLocalSearchParams();
	const productId = params?.id;

	const [name, setName] = useState('');
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState('');
	const [category, setCategory] = useState('');
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState('');

	const { data: product, isLoading, refetch, error: productError } = useGetProductDetailsQuery(productId);
	const [updateProduct, { isLoading: loadingUpdate }] = useUpdateProductMutation();
	const [uploadProductImage, { isLoading: loadingUpload }] = useUploadProductImageMutation();

	useEffect(() => {
		if (product) {
			setName(product.name);
			setPrice(product.price.toString());
			setImage(product.image);
			setCategory(product.category);
			setCountInStock(product.countInStock.toString());
			setDescription(product.description);
		}
	}, [product]);

	const getImageUrl = (imagePath) => {
		if (!imagePath) {
			return null;
		}

		return imagePath.startsWith('http') ? imagePath : `${BASE_URL}${imagePath}`;
	};

	const submitHandler = async () => {
		try {
			await updateProduct({
				productId,
				name,
				price: Number(price),
				image,
				category,
				description,
				countInStock: Number(countInStock)
			}).unwrap();

			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Product updated successfully'
			});

			refetch();
			setTimeout(() => router.back(), 300);
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: error?.data?.message || error.error
			});
		}
	};

	return (
		<View>
			<Text>ProductEditScreen</Text>
		</View>
	);
};

export default ProductEditScreen;

const styles = StyleSheet.create({});
