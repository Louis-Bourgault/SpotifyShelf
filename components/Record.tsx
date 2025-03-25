import React from "react";
import { Image, useWindowDimensions } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	SharedValue,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { getPlatterCenter } from "./Turntable";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Record: React.FC<{
	image: string;
	x: SharedValue<number>;
	zIndex: SharedValue<number>;
}> = ({ image, x, zIndex }) => {
	const rotate = useSharedValue("0deg");
	const scale = useSharedValue(1);
	const startX = useSharedValue(0);
	const startY = useSharedValue(0);
	const y = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [
			{ rotate: rotate.value },
			{ scale: scale.value },
			{ translateX: x.value },
			{ translateY: y.value }
		],
		zIndex: zIndex.value
	}));

	const platterCenter = getPlatterCenter();
	const insets = useSafeAreaInsets();
	const { height: windowHeight, width: windowWidth } = useWindowDimensions();
	const screenWidth = windowWidth;

	const screenHeight = windowHeight - insets.top - insets.bottom;

	const panGesture = Gesture.Pan()
		.onStart(() => {
			startX.value = x.value;
			startY.value = y.value;
		})
		.onUpdate((e) => {
			const newX = startX.value + e.translationX;
			const newY = startY.value + e.translationY;

			x.value = newX;
			y.value = newY;
		})
		.onEnd(() => {
			const record = {
				x: x.value + 75 + screenWidth / 2,
				y: y.value + (screenHeight - 150) * 0.175
			};

			const distance = Math.sqrt(
				(record.x - platterCenter.x) ** 2 +
					(record.y - platterCenter.y) ** 2
			);

			const isOverPlatter = distance < screenHeight * 0.3 * 0.6;

			if (isOverPlatter) {
				x.value = platterCenter.x - screenWidth / 2;
				y.value = platterCenter.y - 75 - (screenHeight - 150) * 0.175;
			}
		});

	return (
		<GestureDetector gesture={panGesture}>
			<Animated.View
				style={[
					{
						height: "100%",
						left: 0,
						position: "absolute",
						top: 0,
						width: "100%"
					},
					animatedStyle
				]}
			>
				<Image
					resizeMode="cover"
					source={require("../assets/record.png")}
					style={{
						aspectRatio: 1,
						height: "100%",
						width: "100%",
						zIndex: 1
					}}
				/>
				<Image
					resizeMode="cover"
					source={{ uri: image }}
					style={{
						aspectRatio: 1,
						borderRadius: "100%",
						height: "50%",
						left: "50%",
						position: "absolute",
						top: "50%",
						transform: [
							{ translateX: `${-0.5 * 100}%` },
							{ translateY: `${-0.5 * 100}%` }
						],
						width: "50%",
						zIndex: 0
					}}
				/>
			</Animated.View>
		</GestureDetector>
	);
};

export default Record;
