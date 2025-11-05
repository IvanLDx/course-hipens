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
	const totalItems = cartItems.reduce((acc, item) => acc + Number(item.qty), 0);
	const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.qty), 0).toFixed(2);

	const updateQuantity = (product, qty) => {
		dispatch(addToCart({ ...product, qty }));
	};

	const deleteItem = (id) => {
		dispatch(removeFromCart(id));
	};

	const renderItem = ({ item }) => (
		<View style={styles.itemContainer}>
			<Image source={{ uri: item.image }} style={styles.itemImage} />
			<View style={styles.itemDetails}>
				<TouchableOpacity
					onPress={() =>
						router.push({
							pathname: '(screens)/ProductScreen',
							params: { productId: item._id }
						})
					}
				>
					<Text style={styles.itemName}></Text>
				</TouchableOpacity>
				<Text style={styles.itemPrice}>${item.price}</Text>
			</View>

			<View style={styles.itemActions}>
				<Picker selectedValue={item.qty} onValueChange={(value) => updateQuantity(item, Number(value))} style={styles.qtyPicker}>
					{[...Array(item.countInStock).keys()].map((x) => (
						<Picker.Item key={x + 1} label={`${x + 1}`} value={x + 1} />
					))}
				</Picker>

				<TouchableOpacity style={styles.removeIcon} onPress={() => deleteItem(item._id)}>
					<Ionicons name="trash" size={20} color={Colors.textRed} />
				</TouchableOpacity>
			</View>
		</View>
	);

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
