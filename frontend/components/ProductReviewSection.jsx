import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import Message from './Message';
import Rating from './Rating';
import { Colors } from '../constants/Utils';
import React from 'react';

const ProductReviewSection = ({ reviews, userInfo, onAddReviewPress }) => {
	return (
		<View style={styles.revewSection}>
			<Text style={styles.sectionTitle}>Customer Reviews</Text>
			{reviews.length === 0 ? (
				<Message variant="info">No reviews yet.</Message>
			) : (
				<View>
					{reviews.map((review) => (
						<View style={styles.reviewCard} key={review._id}>
							<View style={styles.reviewHeader}>
								<Text style={styles.reviewName}>{review.name}</Text>
								<Rating value={review.rating} />
							</View>

							<Text style={styles.reviewDate}>{new Date(review.createdAt).toLocaleDateString()}</Text>

							<Text style={styles.reviewComment}>{review.comment}</Text>
						</View>
					))}

					{userInfo ? (
						<TouchableOpacity style={styles.addReviewButton} onPress={onAddReviewPress}>
							<Text style={styles.reviewButtonText}>Write a review</Text>
						</TouchableOpacity>
					) : (
						<Message variant="info">Please login to submit a review</Message>
					)}
				</View>
			)}
		</View>
	);
};

export default ProductReviewSection;

const styles = StyleSheet.create({
	reviewSection: {
		backgroundColor: Colors.white,
		borderRadius: 12,
		padding: 20,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 5 },
		shadowOpacity: 0.08,
		shadowRadius: 10,
		elevation: 2
	},
	sectionTitle: {
		fontSize: 20,
		fontWeight: '600',
		color: Colors.darkGray,
		marginBottom: 15,
		textAlign: 'center'
	},
	reviewCard: {
		backgroundColor: Colors.offWhite,
		borderRadius: 10,
		padding: 15,
		marginBottom: 10,
		borderWidth: 1,
		borderColor: Colors.lightGray,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.05,
		shadowRadius: 2,
		elevation: 2
	},
	reviewHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8
	}
});
