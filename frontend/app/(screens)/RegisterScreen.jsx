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

		const togglePasswordVisibility = () => {
			setShowPassword(!showPassword);
		};
	};

	return (
		<View>
			<Text>registerScreen</Text>
		</View>
	);
};

export default registerScreen;

const styles = StyleSheet.create({});
