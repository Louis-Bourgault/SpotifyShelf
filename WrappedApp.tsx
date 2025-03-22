import { SafeAreaProvider } from "react-native-safe-area-context";
import App from "./App";
import { GestureHandlerRootView } from "react-native-gesture-handler";

const WrappedApp = () => {
	return (
		<GestureHandlerRootView>
			<SafeAreaProvider>
				<App />
			</SafeAreaProvider>
		</GestureHandlerRootView>
	);
};

export default WrappedApp;
