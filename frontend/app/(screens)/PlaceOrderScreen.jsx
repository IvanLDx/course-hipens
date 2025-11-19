import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
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
						</Text>
					</View>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default PlaceOrderScreen;

const styles = StyleSheet.create({});
