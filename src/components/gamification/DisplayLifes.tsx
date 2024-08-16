import { red } from "@config/colors";
import { Heart } from "phosphor-react-native";
import MyPressable from "../natives/MyPressable";
import MyText from "../natives/MyText";
import { useLifes } from "@src/context/Lifes";

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
      className={`self-start flex-row items-center ${pressableStyle[variant]}`}
    >
      <Heart weight={"duotone"} color={red[300]} size={heartSize[variant]} />
      <MyText className={`text-red-300 font-bold ml-1 ${textStyle[variant]}`}>
        {lifes}
      </MyText>
    </MyPressable>
  );
};

export default DisplayLifes;
