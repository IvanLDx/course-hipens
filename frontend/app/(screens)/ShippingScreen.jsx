import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Keyboard, ScrollView, SafeAreaView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'expo-router';
import Toast from 'react-native-toast-message';
import { saveShippingAddress } from '../../slices/cartSlice';
import { Colors } from '../../constants/Utils';
import React from 'react';

const ShippingScreen = () => {
	return (
		<View>
			<Text>ShippingScreen</Text>
		</View>
	);
};

export default ShippingScreen;

const styles = StyleSheet.create({});
