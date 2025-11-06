import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { useLogin, useLoginMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import FormContainer from '../../components/FormContainer';
import { Colors } from '../../constants/Utils';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);

	const dispatch = useDispatch();
	const router = useRouter();

	const [login, { isLoading }] = useLoginMutation();
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
		try {
			const res = await login({ email, password }).unwrap();

			dispatch(setCredentials({ ...res }));
			router.replace(redirect);
		} catch (error) {
			Toast.show({
				type: 'error',
				text1: 'Login failed',
				text2: error?.data?.message || error.error || 'An unexpected error occurred',
				position: 'top',
				visibilityTime: 7000
			});
		}
	};

	const togglePasswordVisibility = () => {
		setShowPassword(!showPassword);
	};

	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
			<FormContainer>
				<View style={styles.container}>
					<Image source={require('../../assets/images/logo.png')} style={styles.logo} />
					<Text style={styles.slogan}>One Login. Endless Choices</Text>

					<Text style={styles.title}>Sign In</Text>
					<View style={styles.formGroup}>
						<Text style={styles.label}>Email Address:</Text>
						<TextInput
							style={styles.input}
							placeholder="Enter email"
							keyboardType="email-address"
							autoCapitalize="not"
							value={email}
							onChange={setEmail}
						/>
					</View>

					<View style={styles.passwordInput}>
						<Text style={styles.label}>Password</Text>
						<View style={styles.passwordInputContainer}>
							<TextInput
								style={styles.passwordInput}
								placeholder="Enter Password"
								secureTextEntry={!showPassword}
								value={password}
								onChange={setPassword}
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
				</View>
			</FormContainer>
		</TouchableWithoutFeedback>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
