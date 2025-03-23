import React from "react";
import { Image } from "react-native";
import Animated, {
	SharedValue,
	useAnimatedStyle
} from "react-native-reanimated";

const Record: React.FC<{
	image: string;
	x: SharedValue<number>;
	zIndex: SharedValue<number>;
}> = ({ image, x, zIndex }) => {
	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateX: x.value }],
		zIndex: zIndex.value
	}));

	return (
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
	);
};

export default Record;
