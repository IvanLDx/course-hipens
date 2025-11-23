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

	const renderPaginationButtons = () => {
		if (!data?.pages || data.pages.length <= 1) {
			return null;
		}

		return (
			<View style={styles.paginationContainer}>
				{Array.from({ length: data.pages }, (_, i) => i + 1).map((page) => (
					<TouchableOpacity
						key={page}
						style={[styles.pageButton, page === data.page && styles.activePageButton]}
						onPress={() => {
							router.setParams({
								pageNumber: page.toString()
							});
						}}
					>
						<Text style={[styles.pageButtonText, page === data.page && styles.activePageButtonText]}>{page}</Text>
					</TouchableOpacity>
				))}
			</View>
		);
	};

	if (error) {
		return (
			<View style={styles.container}>
				<Message variant="error">
					<Text>{error?.data?.message || error.error}</Text>
				</Message>
			</View>
		);
	}

	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.title}>Products</Text>

					<TouchableOpacity style={styles.addButton} onPress={createProductHandler}>
						<FontAwesome name="plus" size={16} color={Colors.white} />

						<Text style={styles.addButtonText}>Add a product</Text>
					</TouchableOpacity>
				</View>

				<View style={styles.tableHeader}>
					<Text style={[styles.headerCell, { flex: 2 }]}>Name</Text>
					<Text style={[styles.headerCell, { flex: 1 }]}>Price</Text>
					<Text style={[styles.headerCell, { flex: 1.5 }]}>Actions</Text>
				</View>

				<FlatList
					data={data?.products}
					keyExtractor={(item) => item._id}
					contentContainerStyle={{ paddingBottom: 20 }}
					renderItem={({ item: product }) => (
						<View style={styles.tableRow}>
							<Text style={[styles.cell, { flex: 2 }]} numberOfLines={1}>
								{product.name}
							</Text>

							<Text style={[styles.cell, { flex: 1 }]} numberOfLines={1}>
								${product.price}
							</Text>

							<View style={[styles.actionsCell, { flex: 1.5 }]}>
								<TouchableOpacity
									onPress={() =>
										router.push({
											pathname: '/admin/ProductEdotScreen',
											params: { id: product._id }
										})
									}
								>
									<FontAwesome name="edit" color={Colors.primary} size={20} />
								</TouchableOpacity>
							</View>
						</View>
					)}
				></FlatList>
			</View>
		</SafeAreaView>
	);
};

export default ProductListScreen;

const styles = StyleSheet.create({});
