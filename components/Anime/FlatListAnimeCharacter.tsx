import { AnimeData, Character } from "@/types";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { useEffect, useState } from "react";
import { getCharactersAnimeById } from "@/api/animes";
import { ActivityIndicator, FlatList, View } from "react-native";
import CardCharacterSimple from "../character/CardCharacterSimple";

interface Props {
  anime: AnimeData;
}

interface Response {
  favorites: number;
  role: string;
  character: Character;
}

function FlatListAnimeCharacter({ anime }: Props) {
  const [characters, setCharacters] = useState<Response[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getCharactersAnimeById({ id: anime.mal_id })
      .then((res) => setCharacters(res.data))
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

  return (
    <ThemedView className="p-3 pt-0">
      <FlatList
        data={characters}
        renderItem={({ item }) => (
          <CardCharacterSimple character={item.character} />
        )}
        keyExtractor={(item) => item.character.mal_id.toString()}
        horizontal
        className="space-x-3 my-1 p-3 bg-black/20"
      />
    </ThemedView>
  );
}

export default FlatListAnimeCharacter;
