import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { useDispatch, useSelector } from 'react-redux';
import { savePaymentMethod } from '../../slices/cartSlice';
import FormContainer from '../../components/FormContainer';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { Colors } from '../../constants/Utils';

const PaymentScreen = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;

	const [paymentMethod, setPaymentMethod] = useState('PayPal');
	useEffect(() => {
		if (!shippingAddress || !shippingAddress.address) {
			router.replace('(screens)/ShippingScreen');
		}
	}, [shippingAddress, router]);

	const submitHandler = () => {
		if (!paymentMethod) {
			Alert.alert('Error', 'Please select payment method');
			return;
		}

		dispatch(savePaymentMethod(paymentMethod));

		router.push('(screens)/PlaceOrderScreen');
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<FormContainer>
				<View style={styles.formGroup}>
					<Text style={styles.label}>Select Method:</Text>
					<View style={styles.radioGroup}>
						<TouchableOpacity style={styles.radioButton} onPress={() => setPaymentMethod('PayPal')}>
							<MaterialIcons
								name={paymentMethod === 'PayPal' ? 'radio-button-checked' : 'radio-button-unchecked'}
								size={24}
								color={Colors.primary}
							/>

							<Text style={styles.radioLabel}>Paypal or Credit Card</Text>
						</TouchableOpacity>
					</View>
				</View>
			</FormContainer>
		</SafeAreaView>
	);
};

export default PaymentScreen;

const styles = StyleSheet.create({});
