import { AnimeData, Character } from "@/types";
import { styled } from "nativewind";
import { useRef, useState } from "react";
import { Animated, Pressable, StyleSheet, View } from "react-native";

import { ThemedText } from "../ThemedText";
import { Href, Link } from "expo-router";

interface Props {
  character: Character;
}

const ViewStyled = styled(Pressable);

function CardCharacterSimple({ character }: Props) {
  const scale = useRef(new Animated.Value(1)).current;

  const [scaleForImage, setScaleForImage] = useState(1);

  const animatedStyles = {
    transform: [{ scale }],
  };

  return (
    <Link asChild href={`/character/${character.mal_id}` as Href}>
      <ViewStyled
        onPressIn={() => setScaleForImage(1.1)}
        onPressOut={() => setScaleForImage(1)}
        className="active:opacity-70 "
      >
        <View className="overflow-hidden">
          <Animated.Image
            source={{
              uri: character.images.webp.image_url,
            }}
            style={[
              styles.cardImage,
              animatedStyles,
              { transform: [{ scale: scaleForImage }] },
            ]}
          />
        </View>
        <ThemedText></ThemedText>
        <ThemedText className="text-xs text-center text-ellipsis">
          {character.name.slice(0, 15)}
        </ThemedText>
      </ViewStyled>
    </Link>
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

export default CardCharacterSimple;
