import { StyleSheet, Text, View, ActivityIndicator, FlatList, TouchableOpacity, Alert, Platform, SafeAreaView } from 'react-native';
import React from 'react';
import { useRouter, useLocalSearchParams } from 'expo-router';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Message from '../../../components/Message';
import { useGetProductsQuery, useDeleteProductMutation, useCreateReviewMutation } from '../../../slices/productsApiSlice';
import { Colors } from '../../../constants/Utils';

const ProductListScreen = () => {
	const { pageNumber = '1' } = useLocalSearchParams();
	const router = useRouter();
	const { data, isLoading, error, refetch } = useGetProductsQuery({
		pageNumber: Number(pageNumber)
	});
	const [deleteProduct, { isLoading: loadingDelete }] = useDeleteProductMutation();
	const [createProduct, { isLoading: loadingCreate }] = useCreateReviewMutation();

	const deleteHandler = async (id) => {
		Alert.alert('Delete Product', 'Are you sure you want to delete this product?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Delete',
				style: 'destructive',
				onPress: async () => {
					try {
						await deleteProduct(id);
						refetch();
					} catch (error) {
						Alert.alert('Error', error?.data?.message || error.error);
					}
				}
			}
		]);
	};

	const createProductHandler = async () => {
		Alert.alert('Create Product', 'Are you shure you want to create a new product?', [
			{ text: 'Cancel', style: 'cancel' },
			{
				text: 'Create',
				onPress: async () => {
					try {
						await createProduct();
						refetch();
					} catch (error) {
						Alert.alert('Error', error?.data?.message || error.error);
					}
				}
			}
		]);
	};

	return (
		<View>
			<Text>ProductListScreen</Text>
		</View>
	);
};

export default ProductListScreen;

const styles = StyleSheet.create({});
