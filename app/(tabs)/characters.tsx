import TopCharacters from "@/components/character/TopCharacters";
import Header from "@/components/home/Header";
import ParallaxScrollView from "@/components/ParallaxScrollView";

function characters() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ dark: "#cecece", light: "#09f" }}
    >
      <Header />
      <TopCharacters />
    </ParallaxScrollView>
  );
}

export default characters;
