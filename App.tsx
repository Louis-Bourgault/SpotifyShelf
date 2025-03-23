import { LinearGradient } from "expo-linear-gradient";
import React, { useRef } from "react";
import { Image, ImageBackground, StyleSheet, Text, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue
} from "react-native-reanimated";
import {
	SafeAreaView,
	useSafeAreaInsets
} from "react-native-safe-area-context";

const albumCover =
	"https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg";

const albums: any[] = [
	{ name: "The Beatles", image: albumCover, id: "1" },
	{ name: "The Beatles", image: albumCover, id: "2" },
	{ name: "The Beatles", image: albumCover, id: "3" }
];

const App = () => {
	const insets = useSafeAreaInsets();
	const volumeHeight = useSharedValue(0);
	const sliderHeight = useSharedValue(0);
	const sliderWidth = useSharedValue(0);
	const startY = useSharedValue(0);
	const y = useSharedValue(0);

	const panGesture = Gesture.Pan()
		.onStart(() => (startY.value = y.value))
		.onUpdate((e) => {
			const newY = startY.value + e.translationY;
			y.value = Math.min(
				volumeHeight.value / 2 - sliderHeight.value / 2,
				Math.max(-volumeHeight.value / 2 + sliderHeight.value / 2, newY)
			);
		});

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: y.value }],
		left: sliderWidth.value * 0.125
	}));

	return (
		<View style={{ flex: 1 }}>
			<ImageBackground
				source={require("./assets/shelf.png")} // Ensure the image is in the correct path
				style={{ display: "flex", flex: 1 }}
				resizeMode="cover"
			>
				<SafeAreaView style={{ flex: 1 }} edges={["top", "bottom"]}>
					<View style={{ height: "70%" }}>
						{Array.from({ length: 4 }).map((element) => (
							<View style={styles.shelf}>
								{albums.map((album) => (
									<View style={styles.albumContainer}>
										<Image
											source={{ uri: album.image }}
											style={styles.albumCover}
										/>
									</View>
								))}
							</View>
						))}
					</View>
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
							<Image source={require("./assets/shuffle.png")} />
							<Image source={require("./assets/prevNext.png")} />
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
						<View
							style={{
								alignItems: "center",
								display: "flex",
								flex: 1,
								justifyContent: "center"
							}}
						>
							<Image
								onLayout={(e) => {
									volumeHeight.value =
										e.nativeEvent.layout.height;
								}}
								source={require("./assets/volume.png")}
							/>
							<GestureDetector gesture={panGesture}>
								<Animated.Image
									onLayout={(e) => {
										sliderHeight.value =
											e.nativeEvent.layout.height;
										sliderWidth.value =
											e.nativeEvent.layout.width;
									}}
									source={require("./assets/slider.png")}
									style={[
										{
											position: "absolute"
										},
										animatedStyle
									]}
								/>
							</GestureDetector>
						</View>
					</View>
				</SafeAreaView>
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
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	background: {
		flex: 1
	},
	gradient: {
		...StyleSheet.absoluteFillObject // Covers the entire screen
	},
	container: {
		flex: 1,
		paddingTop: 50
	},
	list: {
		alignItems: "center"
	},
	row: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginBottom: 10, // Add spacing between the row and the shelf
		width: "90%"
	},
	albumContainer: {
		alignItems: "center"
	},
	albumCover: {
		backgroundColor: "blue",
		width: 100,
		height: 100,
		borderRadius: 5
	},
	albumText: {
		marginTop: 5,
		fontSize: 12,
		textAlign: "center",
		color: "white" // Ensure text is visible on the dark background
	},
	shelf: {
		display: "flex",
		flexDirection: "row",
		height: "25%",
		justifyContent: "space-evenly"
	},
	shelfContainer: {
		width: "95%",
		flexDirection: "column",
		alignItems: "center", // Center the shelf and row
		marginBottom: 20 // Add spacing between shelves
	}
});

export default App;
