import MyButton from "@src/components/natives/MyButton";
import MyText from "@src/components/natives/MyText";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import React from "react";
import { View } from "react-native";

const Introduction = ({ navigation }: { navigation: any }) => {
  return (
    <ScreenTemplate padding={true}>
      <View />
      <View className="items-center">
        <MyText style={"text-h1 text-bold mb-2"}>Bienvenue !</MyText>

        <MyText style={"text-h2"}>
          Premièrement, on va tester ton niveau, on y va ?
        </MyText>
      </View>
      <MyButton
        className={"self-end"}
        txt={"C'est parti !"}
        onPress={() => navigation.navigate("FirstTest")}
      />
    </ScreenTemplate>
  );
};

export default Introduction;
