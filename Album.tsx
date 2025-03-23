import React, { useState } from "react";
import { Image, Pressable } from "react-native";

const Album: React.FC<{ albumIndex: number; imageURL: string }> = ({
	albumIndex,
	imageURL
}) => {
	const [isSelected, setIsSelected] = useState(false);

	return (
		<Pressable
			key={albumIndex}
			onPress={() => setIsSelected((prev) => !prev)}
			style={{ alignItems: "center" }}
		>
			<Image
				source={{ uri: imageURL }}
				style={{ borderRadius: 5, height: 100, width: 100 }}
			/>
		</Pressable>
	);
};
export default Album;
