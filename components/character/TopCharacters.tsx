import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { Character } from "@/types";
import { useEffect, useState } from "react";
import { getTopCharacters } from "@/api/characters";
import { ThemedView } from "../ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Href, Link } from "expo-router";

interface Props {
  character: Character;
}

function TopCharacters() {
  const [characters, setCharacters] = useState<Character[]>([]);
  useEffect(() => {
    getTopCharacters().then(({ data }) => setCharacters(data));
  }, []);

  return (
    <ThemedView>
      <ThemedText className="p-3 text-center" type="title">
        Personajes más populares
      </ThemedText>
      <View className="flex-row flex-wrap items-center justify-center">
        {characters?.length ? (
          characters.map((character) => (
            <CharacterCard character={character} key={character.mal_id} />
          ))
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ThemedView>
  );
}

function CharacterCard({ character }: Props) {
  const [scaleForImage, setScaleForImage] = useState(1);
  return (
    <Link asChild href={`/character/${character.mal_id}` as Href}>
      <Pressable
        onPressIn={() => setScaleForImage(1.02)}
        onPressOut={() => setScaleForImage(1)}
        className="m-3"
      >
        <View className="overflow-hidden  relative justify-center">
          <Animated.Image
            source={{
              uri: character.images.webp.image_url,
            }}
            style={[
              styles.cardImage,
              { transform: [{ scale: scaleForImage }] },
            ]}
          />

          {/* RANK */}
          {character.nicknames.length ? (
            <ThemedText className="p-2 rounded-sm text-xs bg-white/80 font-bold  w-min text-black absolute top-0 right-0">
              {character.nicknames[0]}
            </ThemedText>
          ) : (
            <ThemedText className="p-2 rounded-sm text-xs bg-white/80 font-bold  w-min text-black absolute top-0 right-0">
              {character.name_kanji}
            </ThemedText>
          )}

          {/* TITLE */}
          <ThemedText className="p-2 rounded-sm text-sm bg-dark/80 font-bold backdrop-blur-3xl w-full text-center absolute bottom-0">
            {character.name}
          </ThemedText>
        </View>
      </Pressable>
    </Link>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    aspectRatio: "4/6",
    width: 250,
    height: 250,
    borderRadius: 12,
    objectFit: "scale-down",
  },
});

export default TopCharacters;
