import { StyleSheet, Text, View, ActivityIndicator, SafeAreaView, Platform } from 'react-native';
import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useRouter, useFocusEffect } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useGetMyOrdersQuery } from '../../slices/ordersApiSlice';
import { Colors } from '../../constants/Utils';
import Message from '../../components/Message';

const orders = () => {
	const { userInfo } = useSelector((state) => state.auth);
	const { data: orders, isLoading, error, refetch } = useGetMyOrdersQuery();
	const router = useRouter();

	useFocusEffect(
		React.useCallback(() => {
			refetch();
		}, [refetch])
	);

	const handleLoginPress = () => {
		router.push('/LoginScreen');
	};

	if (!userInfo) {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={[styles.container, styles.messageContainer]}>
					<Message variant="info">
						<Text style={styles.messageText}>
							Please{' '}
							<Text style={styles.loginLink} onPress={handleLoginPress}>
								Login
							</Text>{' '}
							to see your orders
						</Text>
					</Message>
				</View>
			</SafeAreaView>
		);
	}

	if (isLoading) {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={styles.loaderContainer}>
					<ActivityIndicator size="large" color={Colors.primary}></ActivityIndicator>
				</View>
			</SafeAreaView>
		);
	}

	if (orders && orders.length === 0) {
		return (
			<SafeAreaView style={styles.safeArea}>
				<View style={[styles.container, styles.messageContainer]}>
					<Message variant="info">
						<Text style={styles.messageText}>You have not any orders yet</Text>
					</Message>
				</View>
			</SafeAreaView>
		);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text style={styles.title}>My Orders</Text>

				<View style={styles.tableHeader}>
					<Text style={[styles.headerCell, { flex: 1 }]}>#</Text>
					<Text style={[styles.headerCell, { flex: 1 }]}>Total</Text>
					<Text style={[styles.headerCell, { flex: 1 }]}>Paid</Text>
					<Text style={[styles.headerCell, { flex: 1 }]}>Delivered</Text>
					<Text style={[styles.headerCell, { flex: 1 }]}>View</Text>
				</View>
			</View>
		</SafeAreaView>
	);
};

export default orders;

const styles = StyleSheet.create({});
