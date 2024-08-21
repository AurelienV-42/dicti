import { red } from "@config/colors";
import { useAuth } from "@src/context/Auth";
import { useLifes } from "@src/context/Lifes";
import { Heart } from "phosphor-react-native";
import { View } from "react-native";
import MyPressable from "../natives/MyPressable";
import MyText from "../natives/MyText";

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
      disabled={!isAdmin}
      onPress={resetLifes}
      className={`flex-row items-center ${pressableStyle[variant]}`}
    >
      <View className="mr-1">
        <Heart weight={"duotone"} color={red[300]} size={heartSize[variant]} />
      </View>
      <MyText className={`text-red-300 font-bold ${textStyle[variant]}`}>
        {lifes}
      </MyText>
    </Container>
  );
};

export default DisplayLifes;
