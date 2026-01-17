import { View } from "react-native";
import MyText from "./natives/MyText";

interface BadgeLevelProps {
  level: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const BadgeLevel = ({ level }: BadgeLevelProps) => {
  return (
    <View className={"self-start px-3 py-1 bg-red-300 rounded-full"}>
      <MyText className="text-xs text-white">Niveau collège</MyText>
    </View>
  );
};

export default BadgeLevel;
