import { red } from "@config/colors";
import { useAuth } from "@stores/auth.store";
import { useLifes } from "@stores/lifes.store";
import { Heart } from "lucide-react-native";
import { View } from "react-native";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";

interface DisplayLifesProps {
  variant?: "small" | "normal";
}

const DisplayLifes = ({ variant = "normal" }: DisplayLifesProps) => {
  const { lifes, resetLifes } = useLifes();
  const { isAdmin } = useAuth();
  const Container = !isAdmin ? View : MyPressable;
  const pressableStyle = {
    small: "",
    normal: "bg-red-100 px-4 py-1 rounded-full",
  };
  const heartSize = {
    small: 24,
    normal: 32,
  };
  const textStyle = {
    small: "text-lg",
    normal: "text-2xl",
  };

  return (
    <Container
      accessible
      accessibilityRole="text"
      accessibilityLabel={`${lifes} vies restantes`}
      disabled={!isAdmin}
      onPress={() => resetLifes(isAdmin)}
      className={`flex-row items-center ${pressableStyle[variant]}`}
    >
      <View className="mr-1">
        <Heart fill={red[300]} color={red[300]} size={heartSize[variant]} />
      </View>
      <MyText className={`text-red-300 font-bold ${textStyle[variant]}`}>
        {lifes}
      </MyText>
    </Container>
  );
};

export default DisplayLifes;
