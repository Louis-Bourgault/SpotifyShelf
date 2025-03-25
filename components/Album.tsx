import React, { Dispatch, SetStateAction, useRef, useState } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import Animated, {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const Album: React.FC<{
	index: number;
	imageURL: string;
	selectedAlbumIndex: null | number;
	setSelectedAlbumIndex: Dispatch<SetStateAction<null | number>>;
}> = ({ index, imageURL, selectedAlbumIndex, setSelectedAlbumIndex }) => {
	const ALBUM_SIZE = 100;
	const COLUMNS = 3;
	const GAP = 32;
	const PADDING_HORIZONTAL = 16;
	const column = index % COLUMNS;
	const row = Math.floor(index / COLUMNS);
	const x = PADDING_HORIZONTAL + column * (ALBUM_SIZE + GAP);
	const y = row * (ALBUM_SIZE + GAP);

	const animatedHeight = useSharedValue(100);
	const animatedWidth = useSharedValue(100);
	const animatedX = useSharedValue(x);
	const animatedY = useSharedValue(y);

	const animatedStyle = useAnimatedStyle(() => {
		return {
			height: animatedHeight.value,
			left: animatedX.value,
			position: "absolute",
			top: animatedY.value,
			width: animatedWidth.value
		};
	});

	const albumRef = useRef<View>();
	const hasMeasured = useRef(false);

	const insets = useSafeAreaInsets();

	const recordX = useSharedValue(0);
	const recordZIndex = useSharedValue(0);

	const [isExpanded, setIsExpanded] = useState(false);
	const [originalPosition, setOriginalPosition] = useState({ x: 0, y: 0 });

	const { height: windowHeight, width: windowWidth } = useWindowDimensions();

	const screenHeight = windowHeight - insets.top - insets.bottom;
	const screenWidth = windowWidth;

	const handleGrowth = () => {
		setIsExpanded(true);
		
		const targetX = (screenWidth - 200) / 2;
		const targetY = (screenHeight - 200) * 0.175;

		animatedHeight.value = withTiming(200, { duration: 1000 });
		animatedWidth.value = withTiming(200, { duration: 1000 });
		animatedX.value = withTiming(targetX, {
			duration: 1000
		});
		animatedY.value = withTiming(targetY, {
			duration: 1000
		});
	};

	const handleMeasure = () => {
		if (hasMeasured.current || !albumRef.current) {
			return;
		}

		albumRef.current.measureInWindow((x, y, width, height) => {
			animatedX.value = x;
			animatedY.value = y;

			hasMeasured.current = true;

			setOriginalPosition({ x, y });
		});
	};

	const handlePress = () => {
		setSelectedAlbumIndex((prev) => {
			if (prev === index) {
				handleShrink();

				return null;
			}

			handleGrowth();

			return index;
		});
	};

	const handleShrink = () => {
		animatedHeight.value = withTiming(100, { duration: 1000 });
		animatedWidth.value = withTiming(100, { duration: 1000 });
		animatedX.value = withTiming(originalPosition.x, { duration: 1000 });
		animatedY.value = withTiming(
			originalPosition.y,
			{ duration: 1000 },
			(finished) => {
				runOnJS(setIsExpanded)(false);
			}
		);
	};

	return (
		<Pressable
			onPress={handlePress}
			style={{ zIndex: isExpanded ? 999 : 0 }}
		>
			<Animated.View
				onLayout={handleMeasure}
				ref={albumRef}
				style={animatedStyle}
			>
				<Animated.Image
					source={{ uri: imageURL }}
					style={{
						alignItems: "center",
						borderRadius: 5,
						height: "100%",
						width: "100%"
					}}
				/>
				{/* <Record image={imageURL} x={recordX} zIndex={recordZIndex} /> */}
			</Animated.View>
		</Pressable>
	);
};

export default Album;
