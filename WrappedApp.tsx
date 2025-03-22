import { SafeAreaProvider } from "react-native-safe-area-context";
import App from "./App";

const WrappedApp = () => {
	return (
		<SafeAreaProvider>
			<App />
		</SafeAreaProvider>
	);
};

export default WrappedApp;
