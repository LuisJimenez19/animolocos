import {
  ActivityIndicator,
  Animated,
  FlatList,
  Pressable,
  StyleSheet,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { AnimeData } from "@/types";
import { useEffect, useState } from "react";
import { getPopulateAnimes } from "@/api/animes";
import { ThemedView } from "../ThemedView";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  anime: AnimeData;
}

function PopulateAnimes() {
  const [animes, setAnimes] = useState<AnimeData[]>([]);
  useEffect(() => {
    getPopulateAnimes().then(({ data }) => setAnimes(data));
  }, []);

  return (
    <ThemedView>
      <ThemedText className="p-3 text-center" type="title">
        Animes más populares
      </ThemedText>
      <View className="flex-row flex-wrap items-center justify-center">
        {animes?.length ? (
          animes.map((anime) => <AnimeCard anime={anime} key={anime.mal_id} />)
        ) : (
          <ActivityIndicator />
        )}
      </View>
    </ThemedView>
  );
}

const statusAnime = {
  currently: "bg-yellow-700/80",
  finished: "bg-emerald-800/80",
};

function AnimeCard({ anime }: Props) {
  const [scaleForImage, setScaleForImage] = useState(1);
  return (
    <Pressable
      onPressIn={() => setScaleForImage(1.02)}
      onPressOut={() => setScaleForImage(1)}
      className="m-3"
    >
      <View className="overflow-hidden  relative justify-center">
        <Animated.Image
          source={{
            uri: anime.images.webp.large_image_url,
          }}
          style={[styles.cardImage, { transform: [{ scale: scaleForImage }] }]}
        />

        {/* STATUS */}
        <ThemedText
          className={`p-2 rounded-sm left-0 text-xs  text-center absolute top-2 ${
            statusAnime[
              anime.status
                .split(" ")[0]
                .toLocaleLowerCase() as keyof typeof statusAnime
            ]
          }`}
        >
          {anime.status}
        </ThemedText>

        {/* RANK */}
        <ThemedText className="p-2 rounded-sm text-xs bg-white/80 font-bold  w-min text-black absolute top-0 right-0">
          {anime.rank}
        </ThemedText>

        {/* TITLE */}
        <ThemedText className="p-2 rounded-sm text-sm bg-dark/80 font-bold backdrop-blur-3xl w-full text-center absolute bottom-0">
          {anime.title.slice(0, 20)}
        </ThemedText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  cardImage: {
    aspectRatio: "4/6",
    width: 250,
    height: 250,
    borderRadius: 12,
    objectFit: "cover",
  },
});

export default PopulateAnimes;
