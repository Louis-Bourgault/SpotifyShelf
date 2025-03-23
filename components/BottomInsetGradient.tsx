import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BottomInsetGradient = () => {
	const insets = useSafeAreaInsets();

	return (
		<View
			style={{
				position: "absolute",
				left: 0,
				right: 0,
				bottom: 0,
				height: insets.bottom,
				backgroundColor: "#101010",
				zIndex: 0
			}}
		/>
	);
};

export default BottomInsetGradient;
