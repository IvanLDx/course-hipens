import { StyleSheet, Text, View, TouchableOpacity, Modal, TextInput, ActivityIndicator } from 'react-native';
import React from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../constants/Utils';

const onAddReviewModal = ({ isVisible, onClose, rating, setRating, comment, setComment, onSubmit, isLoading }) => {
	const isSubmitDisabled = !rating || rating === 0 || !comment.trim() || isLoading;

	return (
		<Modal visible={isVisible} transparent={true} animationType="fade" onRequestClose={onClose}>
			<View style={styles.modalOverlay}>
				<View style={styles.modalContent}>
					<TouchableOpacity style={styles.modalCloseButton} onPress={onClose}>
						<Ionicons name="close-circle" size={28} color={Colors.primary}></Ionicons>
					</TouchableOpacity>

					<Text style={styles.modalTitle}>Add your review</Text>

					{isLoading && <ActivityIndicator size="small" color={Colors.primary} />}

					<View style={styles.formGroup}>
						<Text style={styles.formLabel}>Rating</Text>

						<View style={styles.ratingSelection}>
							{[1, 2, 3, 4, 5].map((value) => (
								<TouchableOpacity key={value} onPress={() => setRating(value)} style={styles.ratingStar}>
									<Ionicons
										name={rating >= value ? 'star' : 'star-outline'}
										size={24}
										color={rating >= value ? Colors.primary : Colors.lightGray}
									/>
								</TouchableOpacity>
							))}
						</View>
					</View>

					<View style={styles.formGroup}>
						<Text style={styles.formLabel}>Comment</Text>
						<TextInput
							style={styles.commentInput}
							multiline
							numberOfLines={4}
							value={comment}
							onChangeText={setComment}
							placeholder="Share your thoughts on this product"
							placeholderTextColor={Colors.darkGray}
						/>
					</View>

					<TouchableOpacity
						style={([styles.submitReviewButton], isSubmitDisabled && styles.disabledButton)}
						onPress={onSubmit}
						disabled={isSubmitDisabled}
					></TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default onAddReviewModal;

const styles = StyleSheet.create({});
