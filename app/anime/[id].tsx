import { useEffect, useState } from "react";

import { ExternalLink } from "@/components/ExternalLink";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Stack, useLocalSearchParams } from "expo-router";
import {
  ActivityIndicator,
  FlatList,
  Image,
  StyleSheet,
  View,
} from "react-native";

import { getAnimeById } from "@/api/animes";
import { AnimeData } from "@/types";
import LinkTitleAnime from "@/components/Anime/LinkTitleAnime";
import FlatListAnimeCharacter from "@/components/Anime/FlatListAnimeCharacter";
import FlatListAnimeRelationship from "@/components/Anime/FlatListAnimeRelationship";

function index() {
  const { id } = useLocalSearchParams() as { id: string };
  const [anime, setAnime] = useState<AnimeData>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getAnimeById({ id })
      .then((res) => setAnime(res.data))
      .catch((e) => alert(e))
      .finally(() => setLoading(false));
  }, [id]);

  

  if (loading)
    return (
      <View className="items-center flex-1 justify-center">
        <Stack.Screen
          options={{
            title: anime?.title ?? "loading...",
          }}
        />
        <ActivityIndicator />
      </View>
    );

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: "fff", dark: "#ccc" }}>
      <Stack.Screen
        options={{
          title: anime?.title,
        }}
      />
      <Image
        source={{
          uri: anime?.images.webp.large_image_url,
        }}
        style={styles.image}
      />
      <View className="px-4">
        <LinkTitleAnime anime={anime!} />

        {/* INFO */}
        <ThemedView className="flex-row flex-wrap justify-between gap-2 my-2">
          <ThemedView style={styles.boxInfo}>
            <ThemedText> {anime?.episodes}</ThemedText>
            <ThemedText className="text-xs text-gray-300">
              {" "}
              Episodios
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.boxInfo}>
            <ThemedText> {anime?.score}</ThemedText>
            <ThemedText className="text-xs text-gray-300">
              {" "}
              Puntuación
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.boxInfo}>
            <ThemedText> {anime?.status.split(" ")[0]}</ThemedText>
            <ThemedText className="text-xs text-gray-300">Estado</ThemedText>
          </ThemedView>

          <ThemedView style={styles.boxInfo}>
            <ThemedText> {anime?.type}</ThemedText>
            <ThemedText className="text-xs text-gray-300"> Tipo</ThemedText>
          </ThemedView>
        </ThemedView>

        {/* SINPOSIS */}
        <ThemedView className="mt-2">
          <ThemedText type="subtitle">Sinopsis</ThemedText>
          <ThemedText>{anime?.synopsis}</ThemedText>
        </ThemedView>
      </View>

      {/* LISTA DE PERSONAJES DEL ANIME */}
      <ThemedView className="gap-3">
        <ThemedText type="subtitle" className="px-4">
          Personajes:{" "}
        </ThemedText>
        <FlatListAnimeCharacter anime={anime!} />
      </ThemedView>

      {/* LISTA DE ANIMES RELACIONADOS */}
      <ThemedView className="gap-3">
        <ThemedText type="subtitle" className="px-4">
          Animes Relacionados:{" "}
        </ThemedText>
        <FlatListAnimeRelationship anime={anime!} />
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: "90%",
    height: "auto",
    aspectRatio: "8 / 12",
    marginHorizontal: "auto",
    borderRadius: 12,
  },
  boxInfo: {
    padding: 12,
    backgroundColor: "#222",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    flexGrow: 1,
    flexShrink: 0,
  },
});

export default index;
