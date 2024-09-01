import { TextProps } from "react-native";
import { ThemedText } from "./ThemedText";

interface Props extends TextProps {
  title: string;
}

function TitlePage({ title, ...rest }: Props) {
  return (
    <ThemedText type="title" {...rest}>
      {title}
    </ThemedText>
  );
}

export default TitlePage;
