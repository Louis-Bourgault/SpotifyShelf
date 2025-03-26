import { LinearGradient } from "expo-linear-gradient";
import { Image, useWindowDimensions, View } from "react-native";
import VolumeSlider from "./VolumeSlider";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Turntable = () => {
	return (
		<View
			style={{
				display: "flex",
				flexDirection: "row",
				height: "30%"
			}}
		>
			<LinearGradient
				colors={[
					"rgba(0,0,0,0)",
					"rgba(13,13,13,0.76)",
					"rgba(15,15,15,0.9)",
					"rgba(16,16,16,0.95)",
					"rgba(16,16,16,1)"
				]}
				locations={[0, 0.22, 0.27, 0.31, 0.35]}
				style={{
					position: "absolute",
					top: 0,
					left: 0,
					right: 0,
					bottom: 0
				}}
			/>
			<View
				style={{
					alignItems: "center",
					display: "flex",
					flex: 1,
					justifyContent: "space-evenly",
					paddingVertical: 16
				}}
			>
				<Image source={require("../assets/shuffle.png")} />
				<Image source={require("../assets/prevNext.png")} />
			</View>
			<View
				style={{
					alignItems: "center",
					flex: 2,
					justifyContent: "center",
					position: "relative"
				}}
			>
				<View
					style={{
						aspectRatio: 1,
						height: "60%",
						position: "relative"
					}}
				>
					<View
						style={{
							aspectRatio: 1,
							backgroundColor: "#262626",
							borderRadius: 125,
							height: "100%"
						}}
					/>
					<Image
						source={require("../assets/tonearmBase.png")}
						style={{ position: "absolute", top: 0, right: -24 }}
					/>
				</View>
			</View>
			<VolumeSlider />
		</View>
	);
};

export const getPlatterCenter = () => {
	const insets = useSafeAreaInsets();

	const { height: windowHeight, width: windowWidth } = useWindowDimensions();

	const screenHeight = windowHeight - insets.top - insets.bottom;
	const screenWidth = windowWidth;
	const height = screenHeight * 0.3;
	const top = screenHeight * 0.7;
	const center = { x: screenWidth / 2, y: top + height / 2 };

	return center;
};

export default Turntable;
