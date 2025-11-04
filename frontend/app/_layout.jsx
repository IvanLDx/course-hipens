import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import store from '../store';

const RootLayout = () => {
	return (
		<Provider store={store}>
			<Stack screenOptions={{ headerShown: false }}>
				<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
				<Stack.Screen name="(screens)" options={{ headerShown: false }} />
			</Stack>
			<Toast />
		</Provider>
	);
};

export default RootLayout;
