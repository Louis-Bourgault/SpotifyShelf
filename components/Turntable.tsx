import { LinearGradient } from "expo-linear-gradient";
import { Image, View } from "react-native";
import VolumeSlider from "./VolumeSlider";

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
					justifyContent: "center"
				}}
			>
				<View
					style={{
						aspectRatio: 1,
						backgroundColor: "#262626",
						borderRadius: 125,
						height: "60%"
					}}
				/>
			</View>
			<VolumeSlider />
		</View>
	);
};

export default Turntable;
