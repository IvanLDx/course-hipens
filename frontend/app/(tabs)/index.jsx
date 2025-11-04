import { StyleSheet, Text, View, FlatList, TouchableOpacity, ActivityIndicator, Platform, SafeAreaView } from 'react-native';
import React, { useEffect } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Product from '../../components/Product';
import Message from '../../components/Message';
import Header from '../../components/Header';
import { Colors } from '../../constants/Utils';
import { useGetProductsQuery } from '../../slices/productsApiSlice';

const Home = () => {
	const { keyword = '', pageNumber = '1' } = useLocalSearchParams();
	const router = useRouter();

	const { data, isLoading, error, refetch } = useGetProductsQuery({
		keyword,
		pageNumber: Number(pageNumber)
	});

	useEffect(() => {
		refetch();
	}, [keyword, pageNumber, refetch]);

	const renderPaginationButtons = () => {
		if (!data?.pages || data.pages <= 1) return null;
	};

	return (
		<View>
			<Text>index</Text>
		</View>
	);
};

export default Home;

const styles = StyleSheet.create({});
