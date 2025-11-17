import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, ScrollView, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { saveShippingAddress } from '../../slices/cartSlice';
import { Colors } from '../../constants/Utils';
import React, { useState } from 'react';

const ShippingScreen = () => {
	const cart = useSelector((state) => state.cart);
	const { shippingAddress } = cart;
	const [address, setAddress] = useState(shippingAddress.address || '');
	const [city, setCity] = useState(shippingAddress.city || '');
	const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
	const [country, setCountry] = useState(shippingAddress.country || '');

	const dispatch = useDispatch();
	const router = useRouter();

	const submitHandler = () => {
		Keyboard.dismiss();

		if (!address || !city || !postalCode || !country) {
			Toast.show({
				type: 'error',
				text1: 'Missing Information',
				text2: 'Please fill in all shipping details to continue',
				position: 'top',
				visibilityTime: 7000
			});

			return;
		}

		dispatch(saveShippingAddress({ address, city, postalCode, country }));
		router.push('(screen)/PaymentScreen');
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView behavior={Platform.OS === 'io' ? 'padding' : 'height'} keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}>
				<ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
					<Text style={styles.title}>Shipping</Text>
					<View style={styles.actualFormContainer}>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Address</Text>
							<TextInput style={styles.input} placeholder="Enter address" value={address} onChangeText={setAddress} />
						</View>

						<View style={styles.inputContainer}>
							<Text style={styles.label}>City</Text>
							<TextInput style={styles.input} placeholder="Enter city" value={city} onChangeText={setCity} />
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ShippingScreen;

const styles = StyleSheet.create({});
