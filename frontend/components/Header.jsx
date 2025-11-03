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

	return (
		<View>
			<Text> $2 </Text>
		</View>
	);
};

export default Header;

const styles = StyleSheet.create({});
