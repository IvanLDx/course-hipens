import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Platform, SafeAreaView, Image } from 'react-native';
import React, { useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Toast from 'react-native-toast-message';
import { useCreateOrderMutation } from '../../slices/ordersApiSlice';
import { clearCartItems } from '../../slices/cartSlice';
import { Colors } from '../../constants/Utils';

const PlaceOrderScreen = () => {
	const navigation = useNavigation();
	const cart = useSelector((state) => state.cart);
	const [createOrder, { isLoading, error }] = useCreateOrderMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!cart.shippingAddress.address) {
			navigation.navigate('Shipping');
		} else if (!cart.paymentMethod) {
			navigation.navigate('Payment');
		}
	}, [cart.paymentMethod, cart.shippingAddress.address, navigation]);

	const placeOrderHandler = async () => {
		try {
			const res = await createOrder({
				orderItems: cart.cartItems,
				shippingAddress: cart.shippingAddress,
				paymentMethod: cart.paymentMethod,
				shippingPrice: cart.shippingPrice,
				taxPrice: cart.taxPrice,
				totalPrice: cart.totalPrice
			}).unwrap();

			dispatch(clearCartItems());
			navigation.navigate('(screens)/OrderScreen', { orderId: res._id });
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: error?.data?.message || error.error,
				position: 'top',
				visibilityTime: 7000
			});
		}
	};

	return (
		<SafeAreaView style={styles.container}>
			<ScrollView>
				<Text style={styles.title}>Place Order</Text>

				<View style={styles.gridContainer}>
					<View style={styles.card}>
						<Text style={styles.cardTitle}>Shipping Details</Text>
						<Text style={styles.text}>
							<Text style={styles.strongText}>Address: </Text>
							{cart.shippingAddress.address},{cart.shippingAddress.city},{cart.shippingAddress.postalCode},{cart.shippingAddress.country}
						</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.cartTitle}>Payment Method</Text>
						<Text style={styles.text}>
							<Text style={styles.strongText}>Method: </Text>
							{cart.paymentMethod}
						</Text>
					</View>

					<View style={styles.card}>
						<Text style={styles.cartTitle}>Your Order</Text>
						{cart.cartItems.length === 0 ? (
							<Message variant="info">Your cart is empty</Message>
						) : (
							<View style={styles.orderItemsContainer}>
								{cart.cartItems.map((item, index) => (
									<View key={index} style={styles.orderItem}>
										<View style={styles.imageContainer}>
											<Image source={{ uri: item.image }} style={styles.productImage} />
										</View>

										<View style={styles.productDetails}>
											<Text style={styles.productName}>{item.name}</Text>
											<Text style={styles.text}>
												{item.qty} x ${item.price} =
											</Text>
											<Text style={styles.strongText}>${(item.qty * item.price).toFixed(2)}</Text>
										</View>
									</View>
								))}
							</View>
						)}
					</View>
				</View>

				<View style={styles.rightColumn}>
					<View style={styles.card}>
						<Text style={styles.cartTitle}>Order Summary</Text>
						<View style={styles.summaryRow}>
							<Text style={styles.text}>Items</Text>
							<Text style={styles.textPrice}>${cart.itemsPrice}</Text>
						</View>

						<View style={styles.summaryRow}>
							<Text style={styles.text}>Shipping</Text>
							<Text style={styles.textPrice}>${cart.shippingPrice}</Text>
						</View>

						<View style={styles.summaryRow}>
							<Text style={styles.text}>Tax</Text>
							<Text style={styles.textPrice}>${cart.taxPrice}</Text>
						</View>

						<View style={styles.summaryRow}>
							<Text style={styles.text}>Total</Text>
							<Text style={styles.textPrice}>${cart.totalPrice}</Text>
						</View>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({});
