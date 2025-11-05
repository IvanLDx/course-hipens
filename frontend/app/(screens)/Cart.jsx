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
	const totalPrice = cartItems.reduce((acc, item) => acc + Number(item.price) * totalItems, 0).toFixed(2);

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

						<View style={styles.summary}>
							<Text style={styles.summaryTitle}>Order Summary</Text>
							<View style={styles.summaryRow}>
								<Text style={styles.label}>Total:</Text>
								<Text style={styles.total}>${totalPrice}</Text>
							</View>

							<TouchableOpacity style={[styles.checkoutButton]}>
								<Text style={styles.checkoutText}>Preceed to Checkout</Text>
							</TouchableOpacity>
						</View>
					</View>
				)}
			</View>
		</SafeAreaView>
	);
};

export default Cart;

const styles = StyleSheet.create({
	safeArea: {
		flex: 1,
		backgroundColor: Colors.offWhite
	},
	container: {
		padding: 20
	},
	header: {
		fontSize: 28,
		fontWeight: 'bold',
		color: Colors.primary,
		marginBottom: 20
	},
	emptyMessage: {
		marginTop: 20,
		padding: 20,
		backgroundColor: Colors.infoBorder,
		borderWidth: 1,
		borderRadius: 8,
		alignItems: 'center'
	},
	backLink: {
		color: Colors.primary,
		textDecorationLine: 'underline',
		fontWeight: 'black'
	},
	list: {
		paddingBottom: 20
	},
	itemContainer: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: Colors.white,
		padding: 15,
		marginBottom: 15,
		borderRadius: 10,
		borderWidth: 1,
		borderColor: Colors.lightGray,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 3,
		elevation: 2
	},
	itemImage: {
		width: 80,
		height: 80,
		resizeMode: 'contain',
		borderRadius: 8,
		marginRight: 15
	}
});
