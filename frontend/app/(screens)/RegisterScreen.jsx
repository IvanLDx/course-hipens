import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import FormContainer from '../../components/FormContainer';
import { Colors } from '../../constants/Utils';
import { ActivityIndicator } from 'react-native-web';

const registerScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const [confirmPassword, setConfirmPassword] = useState('');
	const [showConfirmPassword, setShowConfirmPassword] = useState('');

	const dispatch = useDispatch();
	const router = useRouter();

	const [register, { isLoading }] = useRegisterMutation();
	const { userInfo } = useSelector((state) => state.auth);

	const localSearchParams = useLocalSearchParams();
	const redirect = localSearchParams.redirect || '/';

	useEffect(() => {
		if (userInfo) {
			router.replace(redirect);
		}
	}, [userInfo, redirect, router]);

	const submitHandler = async () => {
		Keyboard.dismiss();

		if (password !== confirmPassword) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Passwords do not match',
				position: 'top',
				visibilityTime: 7000
			});

			return;
		}

		try {
			const res = await register({ name, email, password }).unwrap();

			dispatch(setCredentials({ ...res }));
			router.replace(redirect);
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Registration failed',
				text2: error?.data?.message || error.error,
				position: 'top',
				visibilityTime: 7000
			});
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	const toggleConfirmPasswordVisibility = () => {
		setShowConfirmPassword(!showConfirmPassword);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<FormContainer>
				<View style={styles.logoContainer}>
					<Image source={require('../../assets/images/logo.png')} style={styles.logo} />
					<Text style={styles.slogan}>Unlock your world. Register now</Text>
				</View>

				<Text style={styles.title}>Register</Text>
				<View style={styles.formGroup}>
					<Text style={styles.label}>Name:</Text>
					<TextInput style={styles.input} placeholder="Enter name" value={name} onChangeText={setName} />
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Email Address:</Text>
					<TextInput
						style={styles.input}
						placeholder="Enter email"
						keyboardType="email-address"
						autoCapitalize="none"
						value={email}
						onChangeText={setEmail}
					/>
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Password</Text>
					<View style={styles.passwordInputContainer}>
						<TextInput
							style={styles.passwordInput}
							placeholder="Enter Password"
							secureTextEntry={!showPassword}
							value={password}
							onChangeText={setPassword}
						/>
						<TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordToggle}>
							{showPassword ? (
								<FontAwesome6 name="eye-slash" size={20} color={Colors.primary} />
							) : (
								<FontAwesome6 name="eye" size={20} color={Colors.primary} />
							)}
						</TouchableOpacity>
					</View>
				</View>

				<View style={styles.formGroup}>
					<Text style={styles.label}>Confirm password</Text>
					<View style={styles.passwordInputContainer}>
						<TextInput
							style={styles.passwordInput}
							placeholder="Confirm password"
							secureTextEntry={!showConfirmPassword}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
						/>
						<TouchableOpacity onPress={toggleConfirmPasswordVisibility} style={styles.passwordToggle}>
							{showConfirmPassword ? (
								<FontAwesome6 name="eye-slash" size={20} color={Colors.primary} />
							) : (
								<FontAwesome6 name="eye" size={20} color={Colors.primary} />
							)}
						</TouchableOpacity>
					</View>
				</View>

				<TouchableOpacity style={[styles.button, isLoading && styles.buttonDisabled]} onPress={submitHandler} disabled={isLoading}>
					{isLoading ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.buttonText}>Register</Text>}
				</TouchableOpacity>

				<View style={styles.registerContainer}>
					<Text style={styles.registerText}>
						Already have an account?{' '}
						<Link href={{ pathname: '/LoginScreen', params: redirect !== '/' ? { redirect } : {} }} style={styles.registerLink}>
							Login
						</Link>
					</Text>
				</View>
			</FormContainer>
		</TouchableWithoutFeedback>
	);
};

export default registerScreen;

const styles = StyleSheet.create({
	logoContainer: {
		lignItems: 'center',
		marginBottom: 30
	},
	logo: {
		width: 150,
		height: 150,
		resizeMode: 'contain',
		marginBottom: 10
	},
	slogan: {
		fontSize: 18,
		color: Colors.secondary,
		textAlign: 'center'
	},
	title: {
		fontSize: 22,
		fontWeight: 'bold',
		marginBottom: 16,
		textAlign: 'center',
		color: Colors.textColor
	},
	formGroup: {
		marginBottom: 16
	},
	label: {
		fontSize: 14,
		fontWeight: '500',
		color: Colors.textColor,
		marginBottom: 8
	},
	input: {
		width: '100%',
		paddingVertical: 10,
		paddingHorizontal: 12,
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		backgroundColor: Colors.white,
		color: Colors.textColor
	},
	passwordInputContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#ccc',
		borderRadius: 8,
		backgroundColor: Colors.white
	},
	passwordInput: {
		flex: 1,
		paddingVertical: 10,
		paddingHorizontal: 12,
		color: Colors.textColor
	},
	passwordToggle: {
		padding: 10,
		position: 'absolute',
		right: 5
	},
	button: {
		width: '100%',
		backgroundColor: Colors.primary,
		paddingVertical: 12,
		paddingHorizontal: 8,
		borderRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		marginTop: 16
	},
	buttonDisabled: {
		opacity: 0.7
	},
	buttonText: {
		color: Colors.white,
		fontSize: 16,
		fontWeight: 'bold'
	},
	registerContainer: {
		paddingVertical: 12,
		alignItems: 'center',
		marginTop: 10
	},
	registerText: {
		fontSize: 14,
		color: Colors.secondaryTextColor
	},
	registerLink: {
		color: Colors.primary,
		fontWeight: 'bold',
		textDecorationLine: 'underline'
	}
});
