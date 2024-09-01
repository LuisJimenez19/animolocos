import { Image, StyleSheet, View } from "react-native";
import { ThemedText } from "../ThemedText";
import { useEffect, useState } from "react";
import { getAnimeRandom } from "@/api/animes";
import { AnimeData } from "@/types";

function Header() {
  const [animeRandom, setAnimeRandom] = useState<AnimeData | null>(null);

  useEffect(() => {
    getAnimeRandom().then((res) => setAnimeRandom(res.data));
  }, []);

  return (
    <View className="p-4">
      <Image
        source={{
          uri: animeRandom?.images.webp.large_image_url,
        }}
        style={styles.image}
      />
      <Image
        source={{
          uri: animeRandom?.images.webp.large_image_url,
        }}
        className="opacity-5 scale-105 brightness-50"
        style={styles.bgImage}
      />
      <ThemedText className=" bg-dark/50 backdrop-blur-3xl rounded-xl rounded-b-none  py-2 px-4  bottom-0 left-0 absolute z-50 font-bold ">
        {animeRandom?.title}
      </ThemedText>
    </View>
  );
}
const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    objectFit: "cover",
    aspectRatio: "16/8",
  },
  bgImage: {
    width: "100%",
    height: 150,
    borderRadius: 12,
    objectFit: "cover",
    aspectRatio: "16/9",
    position: "absolute",
  },
});
export default Header;
