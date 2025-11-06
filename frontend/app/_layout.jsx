import { Stack } from 'expo-router';
import { Provider } from 'react-redux';
import Toast from 'react-native-toast-message';
import store, { persistor } from '../store';
import { PersistGate } from 'redux-persist/integration/react';

const RootLayout = () => {
	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<Stack screenOptions={{ headerShown: false }}>
					<Stack.Screen name="(tabs)" options={{ headerShown: false }} />
					<Stack.Screen name="(screens)" options={{ headerShown: false }} />
				</Stack>
				<Toast />
			</PersistGate>
		</Provider>
	);
};

export default RootLayout;
