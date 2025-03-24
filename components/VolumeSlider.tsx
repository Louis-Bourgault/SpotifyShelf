import { Image, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
	useAnimatedStyle,
	useSharedValue
} from "react-native-reanimated";

const VolumeSlider = () => {
	const sliderHeight = useSharedValue(0);
	const sliderWidth = useSharedValue(0);
	const startY = useSharedValue(0);
	const volumeHeight = useSharedValue(0);
	const y = useSharedValue(0);

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: y.value }],
		left: sliderWidth.value * 0.125
	}));

	const panGesture = Gesture.Pan()
		.onStart(() => (startY.value = y.value))
		.onUpdate((e) => {
			const newY = startY.value + e.translationY;
			y.value = Math.min(
				volumeHeight.value / 2 - sliderHeight.value / 2,
				Math.max(-volumeHeight.value / 2 + sliderHeight.value / 2, newY)
			);
		});

	return (
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
					volumeHeight.value = e.nativeEvent.layout.height;
				}}
				source={require("../assets/volume.png")}
			/>
			<GestureDetector gesture={panGesture}>
				<Animated.Image
					onLayout={(e) => {
						sliderHeight.value = e.nativeEvent.layout.height;
						sliderWidth.value = e.nativeEvent.layout.width;
					}}
					source={require("../assets/slider.png")}
					style={[
						{
							position: "absolute"
						},
						animatedStyle
					]}
				/>
			</GestureDetector>
		</View>
	);
};

export default VolumeSlider;
