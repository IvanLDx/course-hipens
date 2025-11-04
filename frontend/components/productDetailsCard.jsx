import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Ionicons from '@expo/vector-icons/Ionicons';
import Rating from './Rating';
import { Colors } from '../constants/Utils';
import React from 'react';

const ProductDetailsCard = ({ product, qty, setQty }) => {
	if (!product) return null;

	return (
		<View style={styles.detailsCard}>
			<Text style={styles.productName}>{product.name}</Text>

			<View style={styles.ratingPriceRow}>
				<Text style={styles.priceValue}>${product.price}</Text>
				<Rating value={product.rating} text={`${product.numReviews}`} />
			</View>

			<View style={styles.divider} />

			<Text style={styles.description}>{product.description}</Text>

			<View style={styles.statusQuantityCart}>
				<View style={styles.statusContainer}>
					<Text style={styles.label}>Status</Text>
					<Text style={[styles.statusText, product.countInStock > 0 ? styles.inStock : styles.outOfStock]}>
						{product.countInStock > 0 ? 'In Stock' : 'Out of Stock'}
					</Text>
				</View>

				{product.countInStock > 0 && (
					<View style={styles.quantityContainer}>
						<Text style={styles.label}>Quantity:</Text>
						<Text style={styles.pickerWrapper}>
							<Picker selectedValue={qty} onValueChange={(itemValue) => setQty(itemValue)} style={styles.picker} itemStyle={styles.pickerItem}>
								{[...Array(product.countInStock).keys()].map((x) => (
									<Picker.Item key={x + 1} label={(x + 1).toString()} value={x + 1} color={Colors.darkGray} />
								))}
							</Picker>
						</Text>
					</View>
				)}

				<TouchableOpacity style={[styles.addToCartButton]}>
					<Ionicons name="cart-outline" size={20} color={Colors.primary} />
					<Text style={styles.addToCartText}>Add to Cart</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ProductDetailsCard;

const styles = StyleSheet.create({});
