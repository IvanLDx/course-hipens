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
		} catch (error) {
			setError(error?.data?.message);
			Toast.show({
				type: 'error',
				text1: 'Update Failed',
				text2: error?.data?.message
			});
		}
	};

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView style={styles.scrollContent}>
				<Text style={styles.title}>Account Information</Text>
				<View style={styles.formContainer}>
					{error && (
						<Message variant="error">
							<Text>{error}</Text>
						</Message>
					)}

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Name</Text>
						<TextInput style={styles.input} placeholder="Enter name" value={name} onChangeText={setName} />
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Email</Text>
						<TextInput style={styles.input} placeholder="Enter Email" value={email} onChangeText={setEmail} />
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Password</Text>
						<View style={styles.passwordContainer}>
							<TextInput
								style={styles.passwordInpunt}
								placeholder="Enter Password"
								value={password}
								onChangeText={setPassword}
								secureTextEntry={!showPassword}
							/>

							<TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
								<Ionicons name={showPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={Colors.primary} />
							</TouchableOpacity>
						</View>
					</View>

					<View style={styles.inputContainer}>
						<Text style={styles.label}>Confirm Password</Text>
						<View style={styles.passwordContainer}>
							<TextInput
								style={styles.passwordInpunt}
								placeholder="Confirm Password"
								value={confirmPassword}
								onChangeText={setConfirmPassword}
								secureTextEntry={!showConfirmPassword}
							/>

							<TouchableOpacity style={styles.eyeIcon} onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
								<Ionicons name={showConfirmPassword ? 'eye-off-outline' : 'eye-outline'} size={24} color={Colors.primary} />
							</TouchableOpacity>
						</View>
					</View>

					<TouchableOpacity style={styles.updateButton} onPress={submitHandler} disabled={loadingUpdateProfile}>
						{loadingUpdateProfile ? <ActivityIndicator color={Colors.white} /> : <Text style={styles.updateButtonText}>Update</Text>}
					</TouchableOpacity>
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default AccountInformation;

const styles = StyleSheet.create({});
