import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native';
import { useRouter } from 'expo-router';
import { useSelector, useDispatch } from 'react-redux';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Picker } from '@react-native-picker/picker';
import Message from '../../components/Message';
import { addToCart, removeFromCart } from '../../slices/cartSlice';
import { Colors } from '../../constants/Utils';

const Cart = () => {
	const router = useRouter();
	const dispatch = useDispatch();
	const { cartItems } = useSelector((state) => state.cart);
	const totalItems = cartItems.reduce((acc, item) => acc + item.qty, 0);
	const totalPrice = cartItems.reduce((acc, item) => acc + item.qty, 0).toFixed(2);

	const updateQuantity = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
	};

	const deleteItem = (id) => {
		dispatch(removeFromCart(id));
	};

	return (
		<SafeAreaView style={styles.SafeArea}>
			<View style={styles.container}>
				<Text style={styles.header}>Shopping Cart</Text>
				{cartItems.length === 0 ? (
					<Message variant="info" style={styles.emptyMessage}>
						Your Cart is empty
						<Text style={styles.backLink} onPress={() => router.back()}>
							Go Back
						</Text>
					</Message>
				) : (
					<View style={styles.content}>
						<FlatList
							data={cartItems}
							keyExtractor={(item) => item._id}
							renderItem={renderItem}
							contentContainerStyle={styles.list}
							showsVerticalScrollIndicator={false}
						/>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Cart;

const styles = StyleSheet.create({});
