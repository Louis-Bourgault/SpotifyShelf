import React, { useRef, useState } from "react";
import { Image, Pressable, View } from "react-native";

const Album: React.FC<{
	albumIndex: number;
	imageURL: string;
    isSelected: boolean;
	onPress: (
		index: number,
		layout: { x: number; y: number; width: number; height: number }
	) => void;
}> = ({ albumIndex, imageURL, isSelected, onPress }) => {
	const albumRef = useRef<View>(null);

	const handlePress = () => {
		albumRef.current?.measure((x, y, height, width, pageX, pageY) => {
			onPress(albumIndex, { x: pageX, y: pageY, width, height });
		});
	};

	return (
		<Pressable
			key={albumIndex}
			onPress={handlePress}
			ref={albumRef}
			style={{
				alignItems: "center",
				height: 100,
				width: 100
			}}
		>
			<Image
				source={{ uri: imageURL }}
				style={{
					borderRadius: 5,
					display: isSelected ? "none" : "flex",
					height: 100,
					width: 100
				}}
			/>
		</Pressable>
	);
};
export default Album;
