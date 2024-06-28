import MyButton from "@src/components/natives/MyButton";
import MyText from "@src/components/natives/MyText";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import React from "react";
import { View } from "react-native";

const EmotionFinder = ({ navigation }: { navigation: any }) => {
  return (
    <ScreenTemplate>
      <View />
      <MyText style={"w-4/5 text-center text-h2 text-semiBold"}>
        On va trouver ton émotion ensemble
      </MyText>
      <View className={"justify-between w-full flex-row"}>
        <MyButton
          txt={"Not now"}
          type={"secondary"}
          onPress={() => navigation.goBack()}
        />
        <View />
        <MyButton
          txt={"Let's go!"}
          onPress={() => navigation.navigate("EmotionFinderFirst")}
          style={"mb-4"}
        />
      </View>
    </ScreenTemplate>
  );
};

export default EmotionFinder;
