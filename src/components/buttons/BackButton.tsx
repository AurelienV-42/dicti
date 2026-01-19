import { dark, white } from "@config/colors";
import { useRouter } from "expo-router";
import { ArrowLeft } from "lucide-react-native";
import MyPressable from "@components/natives/MyPressable";

interface BackButtonProps {
  padding?: boolean;
  theme?: "dark" | "white";
}

const BackButton = ({
  padding = true,
  theme = "dark",
}: BackButtonProps): React.ReactElement => {
  const router = useRouter();

  const onPress = (): void => {
    if (router.canGoBack()) router.back();
    else router.replace("/(auth)/introduction");
  };

  return (
    <MyPressable
      accessibilityLabel="Retour"
      onPress={onPress}
      className={`${padding && "p-2"}`}
    >
      <ArrowLeft color={theme === "dark" ? dark : white} />
    </MyPressable>
  );
};

export default BackButton;
