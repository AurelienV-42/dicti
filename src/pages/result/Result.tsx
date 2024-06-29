import MyButton from "@src/components/natives/MyButton";
import MyText from "@src/components/natives/MyText";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import { hapticImpact } from "@src/utils/haptics";
import resetTo from "@src/utils/resetTo";
import React from "react";
import { View } from "react-native";

interface ResultProps {
  navigation: any;
  route: any;
}

const Result = ({ navigation, route }: ResultProps) => {
  const { note } = route.params;

  const onPress = async () => {
    hapticImpact("heavy");
    resetTo(navigation, "Home");
  };

  return (
    <ScreenTemplate>
      <HeaderTemplate canGoBack />
      <View className="w-full">
        <MyText style={"text-h2 w-full mb-4"}>
          Tu as <MyText style={"text-h1 text-orange"}>{note} </MyText>
          {`/ 20 à ta dictée.`}
        </MyText>
        <MyText style={"text-h2 w-full"}>On améliore ça ?</MyText>
      </View>
      <MyButton txt={"S'améliorer"} className="w-full" onPress={onPress} />
    </ScreenTemplate>
  );
};

export default Result;
