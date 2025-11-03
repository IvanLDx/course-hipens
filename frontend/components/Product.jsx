import { StyleSheet, View, Text, Image, TouchableOpacity } from 'react-native';
import { Link } from 'expo-router';
import Rating from './Rating';
import { Colors } from '../constants/Utils';
import { BASE_URL } from '../constants/Urls';

const Product = ({ product }) => {
	const getImageUrl = (imagePath) => {
		if (!imagePath) return null;
		if (imagePath.startsWidth('http')) {
			return imagePath;
		}

		const fullUrl = `${BASE_URL}${imagePath}`;
		return fullUrl;
	};

	return (
		<Link href={{ pathname: '/ProductScreen', params: { productId: product._id } }} asChild>
			<TouchableOpacity activeOpacity={0.8} style={styles.container}>
				<View style={styles.imageWrapper}>
					<Image
						style={styles.image}
						source={{
							uri: getImageUrl(product.image)
						}}
						resizeMethod="contain"
						onError={(e) => {
							console.log('Product - Image load error', e.nativeEvent.error);
							console.log('Product - failed url', getImageUrl(product.image));
						}}
					/>
				</View>
				<View style={styles.infoArea}>
					<Text style={styles.productName} numberOfLines={1} ellipsizeMode="tail">
						{product.name}
					</Text>

					<View style={styles.pricing}>
						<Text style={styles.currentPrice}>${product.price}</Text>
					</View>
				</View>
			</TouchableOpacity>
		</Link>
	);
};

export default Product;

const styles = StyleSheet.create({});
