import { StyleSheet, Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback, Keyboard, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import { useLogin } from '../../slices/userApiSlice';
import { setCredentials } from '../../slices/authSlice';
import { FontAwesome6 } from '@expo/vector-icons/FontAwesome6';
import Toast from 'react-native-toast-message';
import FormContainer from '../../components/FormContainer';
import { Colors } from '../../constants/Utils';

const LoginScreen = () => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [showPassword, setShowPassword] = useState(false);
	const dispatch = useDispatch();
	const router = useRouter();
	return (
		<View>
			<Text>LoginScreen</Text>
		</View>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({});
