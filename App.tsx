import { LinearGradient } from "expo-linear-gradient";
import React, { useState } from "react";
import {
	Dimensions,
	Image,
	ImageBackground,
	StyleSheet,
	View
} from "react-native";
import { Pressable } from "react-native-gesture-handler";
import Animated, {
	Easing,
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import {
	SafeAreaView,
	useSafeAreaInsets
} from "react-native-safe-area-context";
import Album from "./components/Album";
import BottomInsetGradient from "./components/BottomInsetGradient";
import VolumeSlider from "./components/VolumeSlider";

const albums: string[][] = [
	[
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-001-Marvin-Gaye-WHATS-GOING-ON.jpg?w=1000",
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-002-Beach-Boys-PET-SOUNDS-update.jpg?w=1000",
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-003-JoniMitchell-BLUE-HR.jpg?w=1000"
	],
	[
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-004-Stevie-Wonder-SONGS-IN-THE-KEY-OF-LIFE.jpg?w=1000",
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-005-Beatles-ABBEY-ROAD.jpg?w=1000",
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-006-Nirvana-NEVERMIND-HR.jpg?w=1000"
	],
	[
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-007-Fleetwood-Mac-RUMOURS.jpg?w=1000",
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-008-Prince-PURPLE-RAIN.jpg?w=1000",
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-009-Bob-Dylan-BLOOD-ON-THE-TRACKS.jpg?w=1000"
	],
	[
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-010-Lauryn-Hill-MISEDUCATION.jpg?w=1000",
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-011-BeatlesREVOLVER-updated.jpg?w=1000",
		"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-012-MichaelJacksonThriller.jpg?w=1000"
	]
];

const screenHeight = Dimensions.get("screen").height;
const screenWidth = Dimensions.get("screen").width;

const App = () => {
	const insets = useSafeAreaInsets();

	const animatedHeight = useSharedValue(0);
	const animatedWidth = useSharedValue(0);
	const animatedX = useSharedValue(0);
	const animatedY = useSharedValue(0);
	const recordX = useSharedValue(0);
	const recordZIndex = useSharedValue(0);

	const [expandedAlbum, setExpandedAlbum] = useState<null | {
		index: number;
		layout: { x: number; y: number; width: number; height: number };
	}>(null);
	const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(
		null
	);

	const handleAlbumClose = () => {
		if (expandedAlbum) {
			recordX.value = withTiming(200, { duration: 1000 }, (f) => {
				if (f) {
					recordZIndex.value = 0;
					recordX.value = withTiming(
						0,
						{ duration: 1000 },
						(finished) => {
							if (finished) {
								animatedHeight.value = withTiming(100, {
									duration: 1000,
									easing: Easing.inOut(Easing.ease)
								});
								animatedWidth.value = withTiming(100, {
									duration: 1000,
									easing: Easing.inOut(Easing.ease)
								});
								animatedX.value = withTiming(
									expandedAlbum?.layout.x,
									{
										duration: 1000,
										easing: Easing.inOut(Easing.ease)
									}
								);
								animatedY.value = withTiming(
									expandedAlbum?.layout.y - insets.top,
									{
										duration: 1000,
										easing: Easing.inOut(Easing.ease)
									},
									(finished) => {
										if (finished) {
											runOnJS(setSelectedAlbumIndex)(
												null
											);
											runOnJS(setExpandedAlbum)(null);
										}
									}
								);
							}
						}
					);
				}
			});
		}
	};

	const handleAlbumPress = (
		index: number,
		layout: { x: number; y: number; width: number; height: number }
	) => {
		setSelectedAlbumIndex(index);
		setExpandedAlbum({ index, layout });

		animatedHeight.value = layout.height;
		animatedWidth.value = layout.width;
		animatedX.value = layout.x;
		animatedY.value = layout.y;

		animatedHeight.value = withTiming(200, {
			duration: 1000,
			easing: Easing.inOut(Easing.ease)
		});
		animatedWidth.value = withTiming(200, {
			duration: 1000,
			easing: Easing.inOut(Easing.ease)
		});
		animatedX.value = withTiming(screenWidth / 2 - 100, {
			duration: 1000,
			easing: Easing.inOut(Easing.ease)
		});
		animatedY.value = withTiming(
			(0.35 * screenHeight) / 2 - 100,
			{
				duration: 1000,
				easing: Easing.inOut(Easing.ease)
			},
			(finished) => {
				if (finished) {
					recordX.value = withTiming(200, { duration: 1000 }, (f) => {
						if (f) {
							recordX.value = withTiming(100, { duration: 1000 });
							recordZIndex.value = 2;
						}
					});
				}
			}
		);
	};

	const overlayAnimatedStyle = useAnimatedStyle(() => ({
		height: animatedHeight.value,
		left: animatedX.value,
		position: "absolute",
		top: animatedY.value,
		width: animatedWidth.value
	}));

	const recordAnimatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: recordX.value }],
		zIndex: recordZIndex.value
	}));

	return (
		<View style={styles.container}>
			<ImageBackground
				source={require("./assets/shelf.png")} // Ensure the image is in the correct path
				style={{ display: "flex", flex: 1 }}
				resizeMode="cover"
			>
				<SafeAreaView
					style={styles.container}
					edges={["top", "bottom"]}
				>
					<View
						style={{
							display: "flex",
							height: "70%",
							position: "relative"
						}}
					>
						{albums.map((shelf, shelfIndex) => (
							<View key={shelfIndex} style={styles.shelf}>
								{shelf.map((album, albumIndex) => (
									<Album
										albumIndex={shelfIndex * 3 + albumIndex}
										imageURL={album}
										isSelected={
											selectedAlbumIndex ===
											shelfIndex * 3 + albumIndex
										}
										key={shelfIndex * 3 + albumIndex}
										onPress={handleAlbumPress}
									/>
								))}
							</View>
						))}
						{expandedAlbum && (
							<Pressable
								onPress={handleAlbumClose}
								style={{
									position: "absolute",
									top: 0,
									left: 0,
									right: 0,
									bottom: 0,
									zIndex: 999
								}}
							>
								<Animated.View style={overlayAnimatedStyle}>
									<Image
										resizeMode="cover"
										source={{
											uri: albums[
												Math.floor(
													expandedAlbum.index / 3
												)
											][expandedAlbum.index % 3]
										}}
										style={{
											borderRadius: 10,
											height: "100%",
											width: "100%",
											zIndex: 1
										}}
									/>
									<Animated.Image
										resizeMode="cover"
										source={require("./assets/record.png")}
										style={[
											{
												position: "absolute",
												height: "150%",
												width: "150%",
												top: "-35%",
												left: "-25%"
											},
											recordAnimatedStyle
										]}
									/>
								</Animated.View>
							</Pressable>
						)}
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
						<VolumeSlider />
					</View>
				</SafeAreaView>
				<BottomInsetGradient />
			</ImageBackground>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	},
	shelf: {
		display: "flex",
		flexDirection: "row",
		height: "25%",
		justifyContent: "space-evenly"
	}
});

export default App;
