import { red } from "@config/colors";
import { useLifes } from "@src/context/Lifes";
import { Heart } from "phosphor-react-native";
import MyPressable from "../natives/MyPressable";
import MyText from "../natives/MyText";
import { View } from "react-native";

interface DisplayLifesProps {
  variant?: "small" | "normal";
}

const DisplayLifes = ({ variant = "normal" }: DisplayLifesProps) => {
  const { lifes, resetLifes } = useLifes();
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
    <MyPressable
      onPress={resetLifes}
      className={`flex-row items-center ${pressableStyle[variant]}`}
    >
      <View className=" mr-1">
        <Heart weight={"duotone"} color={red[300]} size={heartSize[variant]} />
      </View>
      <MyText className={`text-red-300 font-bold ${textStyle[variant]}`}>
        {lifes}
      </MyText>
    </MyPressable>
  );
};

export default DisplayLifes;
