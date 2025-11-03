import { StyleSheet, View, Text, Image, TouchableOpacity, TextInput } from 'react-native';
import React, { useState, useCallback } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Colors } from '../constants/Utils';
import { useNavigation } from '@react-navigation/native';
import { useRouter, useLocalSearchParams } from 'expo-router';

const Header = () => {
	const [searchText, setSearchText] = useState('');
	const navigation = useNavigation();
	const router = useRouter();

	const { keyword = '' } = useLocalSearchParams();
	const handleSeach = useCallback(() => {
		if (searchText.trim().length >= 2 || searchText.trim().length === 0) {
			router.setParams({
				keyword: searchText.trim(),
				pageNumber: '1'
			});
		}
	}, [searchText, router]);

	const clearSearch = () => {
		setSearchText('');
		router.setParams({
			keyword: '',
			pageNumber: '1'
		});
	};

	const showAllProducts = () => {
		setSearchText('');
		router.setParams({
			keyword: '',
			pageNumber: '1'
		});
	};

	return (
		<View style={styles.headerContainer}>
			<View style={styles.toRow}>
				<Image source={require('../assets/images/logo.png')} />
				<TouchableOpacity onPress={() => {}} style={styles.cartIconContainer}>
					<Ionicons name="cart" size={35} color={Colors.primary} />
				</TouchableOpacity>
			</View>

			<View style={styles.searchRow}>
				<View style={styles.searchContainer}>
					<Ionicons name="search" size={20} color={Colors.primary} style={styles.searchIcon} />
					<TextInput
						style={styles.searchInput}
						placeholder="Search Products..."
						value={searchText}
						onChange={setSearchText}
						placeholderTextColor={Colors.lightGray}
						returnKeyType="search"
						onSubmitEditing={handleSeach}
					/>

					{searchText ? (
						<TouchableOpacity onPress={clearSearch} style={styles.clearButton}>
							<Ionicons name="close-circle" size={20} color={Colors.primary} />
						</TouchableOpacity>
					) : null}
				</View>

				{searchText.length > 0 && (
					<TouchableOpacity style={styles.searchButton} onPress={handleSeach}>
						<Text style={styles.searchButtonText}>Search</Text>
					</TouchableOpacity>
				)}
			</View>

			{keyword && (
				<View style={styles.activeFilterRow}>
					<Text style={styles.filterText}>Showing result for: "{keyword}"</Text>
					<TouchableOpacity style={styles.showAllButton} onPress={showAllProducts}>
						<Text style={styles.showAllButtonText}>Show all products</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({});
