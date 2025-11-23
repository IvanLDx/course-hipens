import { StyleSheet, Text, View, Image, TouchableOpacity, ScrollView, SafeAreaView, Platform } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useLogoutMutation } from '../../slices/userApiSlice';
import { logout } from '../../slices/authSlice';
import { resetCart } from '../../slices/cartSlice';
import Message from '../../components/Message';
import { Colors } from '../../constants/Utils';

const Profile = () => {
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

	const MenuItem = ({ icon, title, onPress, isLast }) => (
		<TouchableOpacity style={[styles.menuItem, !isLast && styles.menuItemBorder]} onPress={onPress}>
			<Ionicons name={icon} size={22} color={Colors.primary} />
			<Text style={styles.menuItemText}>{title}</Text>
			<Ionicons name="chevron-forward" size={20} color={Colors.secondary} />
		</TouchableOpacity>
	);

	return (
		<SafeAreaView style={styles.safeArea}>
			<ScrollView contentContainerStyle={styles.scrollContent}>
				<View style={styles.profileCard}>
					<Image source={require('../../assets/images/profile.png')} style={styles.profileImage} />
					<Text style={styles.userName}>{userInfo.name.split(' ')[0]}</Text>
				</View>

				<View style={styles.menuCard}>
					<MenuItem icon="person-outline" title="Account Information" onPress={() => router.push('/AccountInformation')} />
					<MenuItem icon="document-text-outline" title="Orders" onPress={() => router.push('/orders')} />
					<MenuItem icon="cart-outline" title="Cart" onPress={() => router.push('/(screens)/Cart')} />

					{userInfo.isAdmin && (
						<>
							<MenuItem icon="cube-outline" title="Products" onPress={() => router.push('/admin/ProductListScreen')} />
							<MenuItem icon="list-outline" title="All Orders" onPress={() => router.push('/admin/OrderListScreen')} />
							<MenuItem icon="people-outline" title="Users" onPress={() => router.push('/admin/UserListScreen')} />
						</>
					)}

					<MenuItem icon="log-out-outline" title="Logout" onPress={logoutHandler} isLast />
				</View>
			</ScrollView>
		</SafeAreaView>
	);
};

export default Profile;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.offWhite,
		paddingTop: Platform.OS === 'android' ? 20 : 0
	},
	centeredContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 20,
		marginTop: 20
	},
	messageText: {
		fontSize: 16,
		textAlign: 'center',
		color: Colors.textColor
	},
	loginLink: {
		color: Colors.primary,
		fontWeight: '600',
		textDecorationLine: 'underline'
	},
	scrollContent: {
		alignItems: 'center',
		paddingVertical: 24,
		paddingTop: 20
	},
	profileCard: {
		alignItems: 'center',
		backgroundColor: Colors.white,
		paddingVertical: 24,
		paddingHorizontal: 16,
		borderRadius: 16,
		width: '90%',
		shadowColor: Colors.darkGray,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.12,
		shadowRadius: 8,
		elevation: 2,
		marginBottom: 20,
		marginTop: 10
	},
	profileImage: {
		width: 96,
		height: 96,
		borderRadius: 48,
		marginBottom: 12
	},
	userName: {
		fontSize: 18,
		fontWeight: '600',
		color: Colors.textColor
	},
	menuCard: {
		backgroundColor: Colors.white,
		borderRadius: 16,
		paddingVertical: 8,
		width: '90%',
		shadowColor: Colors.darkGray,
		shadowOffset: { width: 0, height: 4 },
		shadowOpacity: 0.1,
		shadowRadius: 6,
		elevation: 2
	},
	menuItem: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 20,
		paddingVertical: 16,
		width: '100%'
	},
	menuItemBorder: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.lightGray
	},
	menuItemText: {
		flex: 1,
		marginLeft: 16,
		fontSize: 16,
		color: Colors.textColor,
		fontWeight: '500'
	}
});
