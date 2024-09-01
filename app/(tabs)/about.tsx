import { ExternalLink } from "@/components/ExternalLink";
import { HelloWave } from "@/components/HelloWave";
import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Ionicons } from "@expo/vector-icons";
import { Image, Platform, StyleSheet } from "react-native";

export default function Home() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "crimson", dark: "crimson" }}
      headerImage={
        <ThemedView className="relative w-full">
          <Image
            className="mx-auto rounded-md absolute top-4 left-3 "
            source={require("@/assets/images/uno.webp")}
          />
          <ThemedView className="absolute top-28 right-6 p-5 rounded-lg ">
            <ExternalLink
              href="https://luis-dev.pro"
              className="text-white items-start"
            >
              Luis Ángel
              <ThemedView className="-rotate-45 ">
                <Ionicons
                  name="arrow-forward-outline"
                  size={8}
                  color={"#fff"}
                />
              </ThemedView>
            </ExternalLink>
          </ThemedView>
        </ThemedView>
      }
    >
      <ThemedView className="p-3">
        <ThemedView style={styles.titleContainer}>
          <ThemedText type="title">Bienvenido!</ThemedText>
          <HelloWave />
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 1</ThemedText>
          <ThemedText>npx create-expo-app@latest</ThemedText>
          <ThemedText>
            npx create-expo-app@latest --template [--blank-typescript | blank |
            tabs ]
          </ThemedText>
          <ThemedText>Instalar dependencias para compilar para web</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 2</ThemedText>
          <ThemedText>
            Los (tabs) son la navegación que va a mostrar las páginas, en el
            _layout.tsx que esta en app es el layaout principal de toda la
            aplicación
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 3</ThemedText>
          <ThemedText>
            El _layout.tsx que esta en (tabs) es el layout de los tabs donde se
            puede configurar cómo se muestran los tabs, el header y demás.s
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 4</ThemedText>
          <ThemedText>
            Si no quieres que se muestre una página en los tabs, se pone afuera
            de la carpeta (tabs)
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 5</ThemedText>
          <ThemedText>
            Tiene enrutado a través de archivos como en Astro, nextjs, en las
            carpetas entre parentesis solo sirve para agrupar en cuestion de
            archivos pero la ruta es ignorada.
          </ThemedText>
        </ThemedView>

        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 6</ThemedText>
          <ThemedText>Se puede agregar tailwind, usando Nativewind</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Step 7</ThemedText>
          <ThemedText>
            Instalar eas-cli para poder buildear y crear el apk, se necesita
            estar logueado en Expo
          </ThemedText>
        </ThemedView>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
