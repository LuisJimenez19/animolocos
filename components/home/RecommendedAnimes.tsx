import {
  FlatList,
  View,
} from "react-native";
import { ThemedText } from "../ThemedText";
import { useEffect, useState } from "react";
import { getRecommendedAnimes } from "@/api/animes";
import { AnimeData } from "@/types";
import CardAnimeSimple from "../Anime/CardAnimeSimple";

function RecommendedAnimes() {
  const [RecommendedAnimes, setRecommendedAnimes] = useState<AnimeData[]>([]);

  useEffect(() => {
    getRecommendedAnimes().then(({ data }) =>
      setRecommendedAnimes(data)
    );
  }, []);

  return (
    <View>
      <ThemedText type="subtitle" className="px-3">
        Animes recomendados 👇🏽
      </ThemedText>
      <FlatList
        data={RecommendedAnimes}
        keyExtractor={(item) => item.mal_id.toString()}
        horizontal
        renderItem={({ item }) => <CardAnimeSimple anime={item} />}
        className="space-x-3 my-1 p-3 bg-black/20"
      />
    </View>
  );
}



export default RecommendedAnimes;
