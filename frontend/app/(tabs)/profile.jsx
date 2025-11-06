import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';

const profile = () => {
	const router = useRouter();
	const handleLoginPress = () => router.push('/LoginScreen');

	return (
		<View>
			<Text>profile</Text>
			<Text onPress={handleLoginPress} style={{ margin: 50 }}>
				Login
			</Text>
		</View>
	);
};

export default profile;

const styles = StyleSheet.create({});
