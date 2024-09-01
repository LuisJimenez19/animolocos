import { AnimeData } from "@/types";
import { styled } from "nativewind";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "../ThemedText";

interface Props {
  anime: AnimeData;
}

const ViewStyled = styled(Pressable);

function CardAnimeSimple({ anime }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const [scaleForImage, setScaleForImage] = useState(1);

  const animatedStyles = {
    transform: [{ scale }],
  };

  return (
    <ViewStyled
      onPressIn={() => setScaleForImage(1.1)}
      onPressOut={() => setScaleForImage(1)}
      className="active:opacity-70 "
    >
      <View className="overflow-hidden">
        <Animated.Image
          source={{
            uri: anime.images.webp.large_image_url,
          }}
          style={[
            styles.cardImage,
            animatedStyles,
            { transform: [{ scale: scaleForImage }] },
          ]}
        />
      </View>
      <ThemedText className="text-xs text-center text-ellipsis">
        {anime.title.slice(0, 15)}
      </ThemedText>
    </ViewStyled>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    aspectRatio: "4/6",
    width: 200,
    height: 200,
    borderRadius: 12,
    marginHorizontal: 8,
    objectFit: "cover",
  },
});

export default CardAnimeSimple;
