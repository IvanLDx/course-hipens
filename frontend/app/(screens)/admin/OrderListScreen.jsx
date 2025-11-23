import { StyleSheet, Text, View, ActionSheetIOS, FlatList, TouchableOpacity, Platform, SafeAreaView, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useGetMyOrdersQuery, useGetOrdersQuery } from '../../../slices/ordersApiSlice';
import Message from '../../../components/Message';
import { Colors } from '../../../constants/Utils';

const OrderListScreen = () => {
	const { data: orders, isLoading, error } = useGetMyOrdersQuery();
	const router = useRouter();

	if (isLoading) {
		return (
			<View style={styles.loadingContainer}>
				<ActivityIndicator size="large" color={Colors.primary} />
			</View>
		);
	}

	if (error) {
		return (
			<View style={[styles.container, styles.messageContainer]}>
				<Message variant="error">
					<Text style={styles.messageText}>{error?.data.message || error.error}</Text>
				</Message>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<Text style={styles.title}>Orders</Text>
				<View style={styles.tableHeader}>
					<Text style={[styles.headerCell, { flex: 1 }]}>#</Text>
					<Text style={[styles.headerCell, { flex: 1 }]}>USER</Text>
					<Text style={[styles.headerCell, { flex: 1 }]}>PAID</Text>
					<Text style={[styles.headerCell, { flex: 1 }]}>DELIVERED</Text>
					<Text style={[styles.headerCell, { flex: 1 }]}>VIEW</Text>
				</View>
				asd{orders.length}
				<FlatList
					data={orders}
					keyExtractor={(item) => item._id}
					contentContainerStyle={{ paddingBottom: 20 }}
					renderItem={({ item: order, index }) => (
						<View style={styles.tableRow}>
							<Text style={[styles.cell, { flex: 1 }]}>{index + 1}</Text>
							<Text style={[styles.cell, { flex: 2 }]} numberOfLines={1}>
								{order.user && order.user.name}
							</Text>

							<View style={[styles.cell, { flex: 1.5 }]}>
								{order.isPaid ? (
									<Text style={styles.statusTextSuccess}>{order.paidAt.substring(0, 10)}</Text>
								) : (
									<FontAwesome name="times" size={16} color={Colors.textColor} />
								)}
							</View>
						</View>
					)}
				/>
			</View>
		</SafeAreaView>
	);
};

export default OrderListScreen;

const styles = StyleSheet.create({});
