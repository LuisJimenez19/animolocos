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
import { AnimeData, Character } from "@/types";
import LinkTitleAnime from "@/components/Anime/LinkTitleAnime";
import FlatListAnimeCharacter from "@/components/Anime/FlatListAnimeCharacter";
import FlatListAnimeRelationship from "@/components/Anime/FlatListAnimeRelationship";
import { getCharacterById } from "@/api/characters";
import LinkTitleCharacter from "@/components/character/LinkTitleCharacter";

function index() {
  const { id } = useLocalSearchParams() as { id: string };
  const [character, setCharacter] = useState<Character>();
  const [loading, setLoading] = useState(true);

  const [information, setInformation] = useState({
    about: "",
    info: [],
  });

  useEffect(() => {
    getCharacterById({ id })
      .then((res) => {
        setCharacter(res.data);
        const [info, about] = res.data?.about.split("Bounty:")!;
        const blocksInfo = info.split("\n").filter((i: string) => i.length);
        setInformation({
          about,
          info: blocksInfo,
        });
      })
      .catch((e) => alert(e))
      .finally(() => setLoading(false));
  }, [id]);

  console.log(information);
  console.log(character?.about);

  if (loading)
    return (
      <View className="items-center flex-1 justify-center">
        <Stack.Screen
          options={{
            title: "loading...",
          }}
        />
        <ActivityIndicator />
      </View>
    );

  return (
    <ParallaxScrollView headerBackgroundColor={{ light: "fff", dark: "#ccc" }}>
      <Stack.Screen
        options={{
          title: character?.name,
        }}
      />
      <Image
        source={{
          uri: character?.images.webp.image_url,
        }}
        style={styles.image}
      />
      <View className="px-4">
        <LinkTitleCharacter character={character!} />

        {/* INFO */}
        <ThemedView className="flex-row flex-wrap justify-between gap-2 my-2">
          <ThemedView style={styles.boxInfo}>
            <ThemedText> {character?.favorites}</ThemedText>
            <ThemedText className="text-xs text-gray-300">
              {" "}
              Puntuación
            </ThemedText>
          </ThemedView>

          <ThemedView style={styles.boxInfo}>
            <ThemedText> {character?.name_kanji}</ThemedText>
            <ThemedText className="text-xs text-gray-300"> Kanji</ThemedText>
          </ThemedView>

          {information.info.length &&
            information.info.map((i: string) => {
              const [key, value] = i.split(":");
              return (
                <ThemedView key={key} style={styles.boxInfo}>
                  <ThemedText> {value}</ThemedText>
                  <ThemedText className="text-xs text-gray-300">
                    {" "}
                    {key}
                  </ThemedText>
                </ThemedView>
              );
            })}
        </ThemedView>

        {/* Sobre */}
        {information.about && (
          <ThemedView className="mt-2">
            <ThemedText type="subtitle">Sobre {character?.name}</ThemedText>
            <ThemedText>{information.about}</ThemedText>
          </ThemedView>
        )}
      </View>

      {/* LISTA DE PERSONAJES DEL ANIME */}
      {/*  <ThemedView className="gap-3">
        <ThemedText type="subtitle" className="px-4">
          Personajes:{" "}
        </ThemedText>
        <FlatListAnimeCharacter anime={anime!} />
      </ThemedView>

     
      <ThemedView className="gap-3">
        <ThemedText type="subtitle" className="px-4">
          Animes Relacionados:{" "}
        </ThemedText>
        <FlatListAnimeRelationship anime={anime!} />
      </ThemedView> */}
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
