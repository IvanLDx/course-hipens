import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, SafeAreaView, Platform, ActivityIndicator } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useProfileMutation } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { Colors } from '../../constants/Utils';
import Message from '../../components/Message';
import Toast from 'react-native-toast-message';

const AccountInformation = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');

	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	const [error, setError] = useState('');
	const { userInfo } = useSelector((state) => state.auth);
	const [updateProfile, { isLoading: loadingUpdateProfile }] = useProfileMutation();
	const dispatch = useDispatch();

	useEffect(() => {
		if (userInfo) {
			setName(userInfo.name);
			setEmail(userInfo.email);
		}
	}, [userInfo]);

	const submitHandler = async () => {
		if (password !== confirmPassword) {
			setError('Password do not match');
			return;
		}

		try {
			const res = await updateProfile({ name, email, password }).unwrap();

			dispatch(setCredentials({ ...res }));
			setError('');
			setPassword('');
			setConfirmPassword('');

			Toast.show({
				type: 'success',
				text1: 'Success',
				text2: 'Profile updated successfully',
				position: 'top',
				visibilityTime: 5000
			});
		} catch (error) {}
	};

	return (
		<View>
			<Text>AccountInformation</Text>
		</View>
	);
};

export default AccountInformation;

const styles = StyleSheet.create({});
