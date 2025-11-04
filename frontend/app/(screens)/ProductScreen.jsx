import { StyleSheet, Text, View, ScrollView, TouchableOpacity, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
import React, { useState, useEffect } from 'react';
import Toast from 'react-native-toast-message';
import { useNavigation, useRoute, useRouter } from '@react-navigation/native';
import { useGetProductDetailsQuery } from '../../slices/productsApiSlice';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../../constants/Utils';
import { Message } from '../../components/Message';

const orders = () => {
	const route = useRoute();
	const navigation = useNavigation();
	const { productId } = route.params;
	const [qty, setQty] = useState(1);
	useEffect(() => {
		if (!productId) {
			Toast.show({
				type: 'error',
				text1: 'Error',
				text2: 'Product Id not found, please try again or select a product fron the list',
				position: 'top',
				visibilityTime: 7000
			});

			navigation.goBack();
		}
	}, [productId, navigation]);

	const { data: product, isLoading, refetch, error } = useGetProductDetailsQuery(productId);

	return (
		<View>
			<Text>orders</Text>
		</View>
	);
};

export default orders;

const styles = StyleSheet.create({});
