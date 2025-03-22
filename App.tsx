import React from "react";
import {
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  View
} from "react-native";

const albumCover =
	"https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg";

const albums: any[] = [
	{ name: "The Beatles", image: albumCover, id: "1" },
	{ name: "The Beatles", image: albumCover, id: "2" },
	{ name: "The Beatles", image: albumCover, id: "3" }
];

export default function App() {
	return (
		<ImageBackground
			source={require("./assets/shelf.png")} // Ensure the image is in the correct path
			style={styles.background}
			resizeMode="cover"
		>
			<SafeAreaView style={styles.container}>
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
			</SafeAreaView>
		</ImageBackground>
	);
}

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
