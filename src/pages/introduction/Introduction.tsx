import { ID_FIRST_TEST } from "@config/dictations";
import ElevatedContainer from "@src/components/ElevatedContainer";
import MyButton from "@src/components/natives/MyButton";
import MyText from "@src/components/natives/MyText";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import React from "react";
import { View } from "react-native";

const Introduction = ({ navigation }: { navigation: any }) => {
  return (
    <ScreenTemplate>
      <View className="flex-1 justify-center"></View>
      <ElevatedContainer>
        <View className="items-start mb-8">
          <MyText className={"text-2xl font-semibold mb-5"}>
            Améliore ton orthographe quotidiennement
          </MyText>
          <MyText className={"text-base"}>
            Lorem velit est elit quis. Adipisicing labore ullamco ipsum Lorem
            excepteur cupidatat voluptate. Ut commodo aute voluptate. Nulla
            tempor occaecat labore.
          </MyText>
        </View>
        <View className="flex-row w-full justify-between">
          <MyButton
            type="secondary"
            className="border-0 px-0"
            txt={"J'ai déjà un compte"}
            onPress={() => navigation.navigate("SignIn")}
          />
          <MyButton
            className="self-end"
            txt={"C'est parti !"}
            onPress={() =>
              navigation.navigate("FirstTest", { dictationID: ID_FIRST_TEST })
            }
          />
        </View>
      </ElevatedContainer>
    </ScreenTemplate>
  );
};

export default Introduction;
