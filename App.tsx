import React from "react";
import {
	StyleSheet,
	Text,
	View,
	Image,
	FlatList,
	ImageBackground
} from "react-native";
import { LinearGradient } from "expo-linear-gradient"; // Install expo-linear-gradient if not already installed

const albumCover =
	"https://upload.wikimedia.org/wikipedia/en/4/42/Beatles_-_Abbey_Road.jpg";

const data: Array<ShelfProps> = [
	[
		{ name: "The Beatles", image: albumCover, id: "1" },
		{ name: "The Beatles", image: albumCover, id: "2" },
		{ name: "The Beatles", image: albumCover, id: "3" }
	],
	[
		{ name: "The Beatles", image: albumCover, id: "4" },
		{ name: "The Beatles", image: albumCover, id: "5" },
		{ name: "The Beatles", image: albumCover, id: "6" }
	],
	[
		{ name: "The Beatles", image: albumCover, id: "7" },
		{ name: "The Beatles", image: albumCover, id: "8" },
		{ name: "The Beatles", image: albumCover, id: "9" }
	]
];

function Shelf({ shelf }: { shelf: ShelfProps }) {
	return (
		<View style={styles.shelfContainer}>
			{/* Row of album covers */}
			<View style={styles.row}>
				{shelf.map((item) => (
					<View key={item.id} style={styles.albumContainer}>
						<Image
							source={{ uri: item.image }}
							style={styles.albumCover}
						/>
						<Text style={styles.albumText}>{item.name}</Text>
					</View>
				))}
			</View>
			{/* Shelf image below the row. This currently doesn't work for some reason, I've got more important things to fix now. */}
			{/* <Image source={require('./assets/shelf.jpg')} style={styles.shelf} /> */}
		</View>
	);
}

export default function App() {
	return (
		<ImageBackground
			source={require("./assets/shelfBackground.png")} // Ensure the image is in the correct path
			style={styles.background}
			resizeMode="cover"
		>
			{/* <LinearGradient
        colors={['transparent', 'black']}
        style={styles.gradient}
      />*/}
			<View style={styles.container}>
				<FlatList
					data={data}
					keyExtractor={(_, index) => index.toString()}
					renderItem={({ item }) => <Shelf shelf={item} />}
					contentContainerStyle={styles.list}
				/>
			</View>
		</ImageBackground>
	);
}

type ShelfProps = Array<{ name: string; image: string; id: string }>;

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
		width: 110,
		height: 110,
		borderRadius: 5
	},
	albumText: {
		marginTop: 5,
		fontSize: 12,
		textAlign: "center",
		color: "white" // Ensure text is visible on the dark background
	},
	shelf: {
		width: "100%",
		height: 30,
		resizeMode: "contain" // Ensure the shelf image scales properly
	},
	shelfContainer: {
		width: "95%",
		flexDirection: "column",
		alignItems: "center", // Center the shelf and row
		marginBottom: 20 // Add spacing between shelves
	}
});
