import { ID_FIRST_TEST } from "@config/dictations";
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
        <MyText style={"text-3xl text-bold mb-2"}>Bienvenue !</MyText>

        <MyText style={"text-2xl"}>
          Premièrement, on va tester ton niveau, on y va ?
        </MyText>
      </View>
      <MyButton
        className={"self-end"}
        txt={"C'est parti !"}
        onPress={() =>
          navigation.navigate("FirstTest", { dictationID: ID_FIRST_TEST })
        }
      />
    </ScreenTemplate>
  );
};

export default Introduction;
