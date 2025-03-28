import React, { useEffect, useState } from "react";
import { ImageBackground, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import BottomInsetGradient from "./components/BottomInsetGradient";
import Turntable from "./components/Turntable";
import Album from "./components/Album";
import Animated, {
	useAnimatedStyle,
	useSharedValue,
	withTiming
} from "react-native-reanimated";

const albums: string[] = [
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-001-Marvin-Gaye-WHATS-GOING-ON.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-002-Beach-Boys-PET-SOUNDS-update.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-003-JoniMitchell-BLUE-HR.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-004-Stevie-Wonder-SONGS-IN-THE-KEY-OF-LIFE.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-005-Beatles-ABBEY-ROAD.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-006-Nirvana-NEVERMIND-HR.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-007-Fleetwood-Mac-RUMOURS.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-008-Prince-PURPLE-RAIN.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-009-Bob-Dylan-BLOOD-ON-THE-TRACKS.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-010-Lauryn-Hill-MISEDUCATION.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-011-BeatlesREVOLVER-updated.jpg?w=1000",
	"https://www.rollingstone.com/wp-content/uploads/2020/09/R1344-012-MichaelJacksonThriller.jpg?w=1000"
];

const App = () => {
	const opacity = useSharedValue(0);

	const [selectedAlbumIndex, setSelectedAlbumIndex] = useState<number | null>(
		null
	);

	useEffect(() => {
		opacity.value = withTiming(selectedAlbumIndex !== null ? 0.5 : 0, {
			duration: 1000
		});
	}, [selectedAlbumIndex]);

	const animatedStyle = useAnimatedStyle(() => {
		return { opacity: opacity.value };
	});

	return (
		<ImageBackground
			source={require("./assets/shelf.png")}
			style={{ display: "flex", flex: 1 }}
			resizeMode="cover"
		>
			<SafeAreaView style={styles.container} edges={["top", "bottom"]}>
				<Animated.View
					pointerEvents={"none"}
					style={[
						{
							backgroundColor: "rgb(0,0,0)",
							bottom: 0,
							left: 0,
							position: "absolute",
							right: 0,
							top: 0,
							zIndex: 10
						},
						animatedStyle
					]}
				/>
				<View
					style={{
						height: "70%",
						position: "relative"
					}}
				>
					{albums.map((album, index) => (
						<Album
							index={index}
							imageURL={album}
							key={index}
							selectedAlbumIndex={selectedAlbumIndex}
							setSelectedAlbumIndex={setSelectedAlbumIndex}
						/>
					))}
				</View>
				<Turntable />
			</SafeAreaView>
			<BottomInsetGradient />
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1
	}
});

export default App;
