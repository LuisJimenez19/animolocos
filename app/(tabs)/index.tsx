import ParallaxScrollView from "@/components/ParallaxScrollView";
import Header from "@/components/home/Header";
import PopulateAnimes from "@/components/home/PopulateAnimes";
import RecommendedAnimes from "@/components/home/RecommendedAnimes";

export default function HomeScreen() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
    >
      <Header />
      <RecommendedAnimes />
      <PopulateAnimes />
    </ParallaxScrollView>
  );
}
