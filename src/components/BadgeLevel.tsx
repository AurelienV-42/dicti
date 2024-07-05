import { View } from "react-native";
import MyText from "./natives/MyText";

const BadgeLevel = ({ level }) => {
  return (
    <View className={"self-start px-3 py-1 bg-red-300 rounded-full"}>
      <MyText className="text-xs text-white">Niveau collège</MyText>
    </View>
  );
};

export default BadgeLevel;
