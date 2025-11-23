import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import Message from '../../components/Message';

const profile = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const router = useRouter();
	const [logoutApiCall] = useLogoutMutation();

	const handleLogin = () => router.push('/LoginScreen');
	const logoutHandler = async () => {
		try {
			await logoutApiCall().unwrap();

			dispatch(logout());
			dispatch(resetCart());

			router.replace('/');
		} catch (error) {
			console.log('Logout error: ', error);
		}
	};

	if (!userInfo) {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.centeredContainer}>
					<Message variant="info">
						<Text style={styles.messageText}>
							Please{' '}
							<Text style={styles.loginLink} onPress={handleLogin}>
								login
							</Text>{' '}
							to see your profile
						</Text>
					</Message>
				</View>
			</SafeAreaView>
		);
	}

	const menuItem = ({ icon, title, onPress, isLast }) => {
		<TouchableOpacity style={[styles.menuItem, !isLast && styles.menuItemBorder]} onPress={onPress}>
			<Ionicons name={icon} size={22} color={Colors.primary} />
			<Text style={styles.menuItemText}>{title}</Text>
			<Ionicons name="chevron-forward" size={20} color={Colors.secondary} />
		</TouchableOpacity>;
	};

	return <asd></asd>;
};

export default profile;

const styles = StyleSheet.create({});
