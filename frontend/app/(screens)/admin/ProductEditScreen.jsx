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
import Message from '../../../components/Message';

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
			setPrice(product.price);
			setImage(product.image);
			setCategory(product.category);
			setCountInStock(product.countInStock);
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

	const uploadFileHandler = async () => {
		try {
			const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

			if (!permissionResult.granted) {
				Toast.show({
					type: 'error',
					text1: 'Permission denied',
					text2: 'Camera roll access is required'
				});

				return;
			}

			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.mediaType.Images,
				allowsEditing: false,
				quality: 1
			});

			if (!result.canceled) {
				const formData = new FormData();
				formData.append('image', {
					uri: result.assets[0].uri,
					type: 'image/jpeg',
					name: 'image.jpg'
				});

				const response = await uploadProductImage(formData).unwrap();
				setImage(response.image);

				Toast.show({
					type: 'success',
					text1: 'Uploaded',
					text2: 'Image uploaded successfully'
				});
			}
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Upload failed',
				text2: error?.data?.message || error.error
			});
		}
	};

	if (isLoading) {
		return (
			<View style={styles.centered}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (productError) {
		return (
			<View style={styles.centered}>
				<Message variant="error">{productError?.data?.message || productError.error}</Message>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} styles={{ flex: 1 }}>
				<ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.ScrollViewContent} keyboardShouldPersistTaps="handled">
					<FormContainer>
						<View style={styles.header}>
							<TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
								<Ionicons name="chevron-back-circle" size={35} color={Colors.primary} />
							</TouchableOpacity>

							<Text style={styles.title}>Edit product</Text>
						</View>

						<View style={styles.form}>
							<View style={styles.formGroup}>
								<Text style={styles.label}>Name</Text>
								<TextInput
									style={styles.input}
									value={name}
									onChangeText={setName}
									placeholder="Enter name"
									placeholderTextColor={Colors.secondaryTextColor}
								/>
							</View>
						</View>

						<View style={styles.form}>
							<View style={styles.formGroup}>
								<Text style={styles.label}>Price</Text>
								<TextInput
									style={styles.input}
									value={price}
									onChangeText={setPrice}
									placeholder="Enter price"
									placeholderTextColor={Colors.secondaryTextColor}
								/>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Image</Text>
								{image && (
									<View style={styles.imageContainer}>
										<Image source={{ uri: getImageUrl(image) }} style={styles.productImage} />
										<Text style={styles.imageUrl}>{getImageUrl(image)}</Text>
									</View>
								)}

								<TouchableOpacity style={styles.uploadButton} onPress={uploadFileHandler}>
									<Text style={styles.uploadButtonText}>
										{loadingUpload ? <ActivityIndicator size="small" color={Colors.white} /> : 'Upload image'}
									</Text>
								</TouchableOpacity>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Count in stock</Text>
								<TextInput
									style={styles.input}
									value={countInStock}
									onChangeText={setCountInStock}
									placeholder="Enter count in stock"
									keyboardType="numeric"
									placeholderTextColor={Colors.secondaryTextColor}
								/>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Category</Text>
								<TextInput
									style={styles.input}
									value={category}
									onChangeText={setCategory}
									placeholder="Enter category"
									placeholderTextColor={Colors.secondaryTextColor}
								/>
							</View>

							<View style={styles.formGroup}>
								<Text style={styles.label}>Description</Text>
								<TextInput
									style={[styles.input, styles.textArea]}
									value={description}
									onChangeText={setDescription}
									placeholder="Enter description"
									multiline
									numberOfLines={4}
									placeholderTextColor={Colors.secondaryTextColor}
								/>
							</View>

							<TouchableOpacity
								style={[styles.submitButton, loadingUpdate && styles.submitButtonDisabled]}
								onPress={submitHandler}
								disabled={loadingUpdate}
							>
								{loadingUpdate ? (
									<View style={styles.loadingContainer}>
										<ActivityIndicator size="small" color={Colors.white} />

										<Text style={styles.submitButtonText}>Update...</Text>
									</View>
								) : (
									<Text style={styles.submitButtonText}>Update Product</Text>
								)}
							</TouchableOpacity>
						</View>
					</FormContainer>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ProductEditScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.offWhite,
		paddingTop: Platform.OS === 'android' ? 20 : 0
	},
	ScrollViewContent: {
		flexGrow: 1,
		paddingTop: Platform.OS === 'android' ? 20 : 0
	},
	header: {
		flexDirection: 'row',
		alignItems: 'center',
		marginBottom: 25,
		paddingHorizontal: 5
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.offWhite
	}
});
