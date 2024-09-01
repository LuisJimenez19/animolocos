import { AnimeData, Character } from "@/types";
import { ExternalLink } from "../ExternalLink";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  character: Character;
}

function LinkTitleCharacter({ character }: Props) {
  return (
    <ExternalLink href={character?.url as string}>
      <ThemedView className=" items-start flex-row">
        <ThemedText
          className={`text-2xl max-w-[350px] font-bold `}
          style={{
            flexWrap: "wrap",
          }}
          numberOfLines={2}
        >
          {character?.name}
        </ThemedText>

        <ThemedView className="-rotate-45">
          <Ionicons name="arrow-forward-outline" size={16} color={"#fff"} />
        </ThemedView>
      </ThemedView>
    </ExternalLink>
  );
}

export default LinkTitleCharacter;
