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
		router.push('(screens)/PaymentScreen');
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<KeyboardAvoidingView
				style={{ flex: 1 }}
				behavior={Platform.OS === 'io' ? 'padding' : 'height'}
				keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
			>
				<ScrollView style={styles.container} contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
					<Text style={styles.title}>Shipping</Text>
					<View style={styles.actualFormContainer}>
						<View style={styles.inputContainer}>
							<Text style={styles.label}>Address</Text>
							<TextInput style={styles.input} placeholder="Enter address" value={address} onChangeText={setAddress} />

							<Text style={styles.label}>City</Text>
							<TextInput style={styles.input} placeholder="Enter city" value={city} onChangeText={setCity} />

							<Text style={styles.label}>Postal Code</Text>
							<TextInput
								style={styles.input}
								placeholder="Enter postal code"
								value={postalCode}
								onChangeText={setPostalCode}
								keyboardType="numeric"
							/>

							<Text style={styles.label}>Country</Text>
							<TextInput style={styles.input} placeholder="Enter country" value={country} onChangeText={setCountry} />

							<TouchableOpacity style={styles.button} onPress={submitHandler}>
								<Text style={styles.buttonText}>Continue</Text>
							</TouchableOpacity>
						</View>
					</View>
				</ScrollView>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

export default ShippingScreen;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.offWhite,
		paddingTop: Platform.OS === 'android' ? 20 : 0
	},
	container: {
		flex: 1
	},
	scrollContent: {
		flexGrow: 1,
		justifyContent: 'center'
	},
	actualFormContainer: {
		backgroundColor: Colors.white,
		margin: 16,
		padding: 16,
		borderRadius: 12,
		shadowColor: Colors.darkGray,
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 2
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		color: Colors.primary,
		textAlign: 'start',
		padding: 20
	},
	inputContainer: {
		fontSize: 14,
		fontWeight: '500',
		color: Colors.textColor,
		marginBottom: 8
	},
	input: {
		backgroundColor: Colors.white,
		borderWidth: 1,
		borderColor: Colors.lightGray,
		borderRadius: 8,
		padding: 12,
		fontSize: 16,
		color: Colors.textColor
	},
	button: {
		backgroundColor: Colors.primary,
		padding: 16,
		borderRadius: 8,
		alignItems: 'center',
		marginTop: 8
	},
	buttonText: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: '600'
	}
});
