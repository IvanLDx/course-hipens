import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute, useRouter } from '@react-navigation/native';
import { useGetProductDetailsQuery, useCreateReviewMutation } from '../../slices/productsApiSlice';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Utils';
import { useSelector, useDispatch } from 'react-redux';
import { addToCart } from '../../slices/cartSlice';
import { Message } from '../../components/Message';
import ProductImageCard from '../../components/ProductImageCard';
import ProductDetailsCard from '../../components/productDetailsCard';
import ProductReviewSection from '../../components/ProductReviewSection';

const ProductScreen = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const dispatch = useDispatch();
	const { productId } = route.params;
	const [qty, setQty] = useState(1);
	const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
	const { userInfo } = useSelector((state) => state.auth);

	useEffect(() => {
		if (!productId) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Product Id not found, please try again or select a product fron the list',
				position: 'top',
				visibilityTime: 7000
			});

			navigation.goBack();
		}
	}, [productId, navigation]);

	const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

	if (isLoading) {
		return (
			<View style={styles.center}>
				<ActivityIndicator size="large" color={Colors.primary}></ActivityIndicator>
			</View>
		);
	}

	if (error) {
		const errorMessage = error?.data?.message || error.error;

		return (
			<View style={styles.center}>
				<Message variant="error">{errorMessage}</Message>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.errorBackButton}>
					<Text style={styles.errorBackButtonText}>Go Back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	if (!product) {
		return (
			<View style={styles.center}>
				<Message variant="info">No product data available</Message>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.errorBackButton}>
					<Text style={styles.errorBackButtonText}>Go Back</Text>
				</TouchableOpacity>
			</View>
		);
	}

	const handleAddToCart = () => {
		if (product) {
			dispatch(addToCart({ ...product, qty }));
			navigation.navigate('(screens)/Cart');
		} else {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Product data not loaded yet. Cannot add to cart.',
				position: 'top',
				visibilityTime: 7000
			});
		}
	};

	const disableAddToCart = product?.countInStock === 0;

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.container}>
				<TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
					<Ionicons name="arrow-back-circle" size={40} color={Colors.primary} />
				</TouchableOpacity>
				<ProductImageCard imageUrl={product.image} />
				<ProductDetailsCard
					product={product}
					qty={qty}
					setQty={setQty}
					handleAddToCart={handleAddToCart}
					disableAddToCart={disableAddToCart}
				></ProductDetailsCard>

				<ProductReviewSection reviews={product.reviews} userInfo={userInfo} onAddReviewPress={() => setIsReviewModalOpen(true)} />
			</ScrollView>
		</SafeAreaView>
	);
};

export default ProductScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.offWhite,
		paddingTop: Platform.OS === 'android' ? 25 : 0
	},
	center: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: Colors.offWhite,
		padding: 20
	},
	errorBackButton: {
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 25,
		borderRadius: 10,
		marginTop: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.2,
		shadowRadius: 3,
		elevation: 2
	},
	errorBackButton: {
		color: Colors.white,
		fontWeight: '600',
		fontSize: 16
	},
	container: {
		padding: 18,
		paddingBottom: 30
	},
	backButton: {
		marginVertical: 10,
		alignSelf: 'flex-start'
	}
});
