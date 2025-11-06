import { StyleSheet, Text, View, Dimensions, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import React from 'react';

const { width } = Dimensions.get('window');

const FormContainer = ({ children }) => {
	return (
		<KeyboardAvoidingView
			behaviour={Platform.OS === 'ios' ? 'padding' : 'height'}
			style={styles.keyboardAvoidingView}
			keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : 20}
		>
			<ScrollView contentContainerStyle={styles.scrollContainer} keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
				<View style={styles.container}>
					<View style={styles.innerContainer}>{children}</View>
				</View>
			</ScrollView>
		</KeyboardAvoidingView>
	);
};

export default FormContainer;

const styles = StyleSheet.create({});
