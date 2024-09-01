import { AnimeData } from "@/types";
import { ExternalLink } from "../ExternalLink";
import { ThemedView } from "../ThemedView";
import { ThemedText } from "../ThemedText";
import { Ionicons } from "@expo/vector-icons";

interface Props {
  anime: AnimeData;
}

function LinkTitle({ anime }: Props) {
  return (
    <ExternalLink href={anime?.url as string}>
      <ThemedView className=" items-start flex-row">
        <ThemedText
          className={`text-2xl max-w-[350px] font-bold `}
          style={{
            flexWrap: "wrap",
          }}
          numberOfLines={2}
        >
          {anime?.title}
        </ThemedText>

        <ThemedView className="-rotate-45">
          <Ionicons name="arrow-forward-outline" size={16} color={"#fff"} />
        </ThemedView>
      </ThemedView>
    </ExternalLink>
  );
}

export default LinkTitle;
