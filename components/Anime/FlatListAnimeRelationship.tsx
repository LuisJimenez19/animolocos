import { AnimeData } from "@/types";
import { ActivityIndicator, FlatList } from "react-native";
import CardAnimeSimple from "./CardAnimeSimple";
import { useEffect, useState } from "react";
import { ThemedView } from "../ThemedView";
import { getAnimeRelationshipById } from "@/api/animes";
import { ThemedText } from "../ThemedText";

interface Props {
  anime: AnimeData;
}

interface Response {
  relation: string;
  entry: AnimeData[];
}

function FlatListAnimeRelationship({ anime }: Props) {
  const [animes, setAnimes] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAnimeRelationshipById({ id: anime.mal_id })
      .then((res) => setAnimes(res.data))
      .catch((e) => alert(e))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <ThemedView className="items-center justify-center min-h-[100px]">
        <ActivityIndicator />
      </ThemedView>
    );
  }

  if (!loading && animes.length === 0) {
    <ThemedView className="items-center justify-center min-h-[100px]">
      <ThemedText>No hay animes relacionados</ThemedText>
    </ThemedView>;
  }

  const entries = animes.flatMap((a) => a.entry);

  return (
    <FlatList
      data={entries}
      keyExtractor={(item) => item.title}
      horizontal
      renderItem={({ item }) => <CardAnimeSimple anime={item} />}
      className="space-x-3 my-1 p-3 bg-black/20"
    />
  );
}

export default FlatListAnimeRelationship;
