import MyButton from "@src/components/natives/MyButton";
import MyText from "@src/components/natives/MyText";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import React from "react";

const FirstTest = ({ navigation }: { navigation: any }) => {
  return (
    <ScreenTemplate>
      <HeaderTemplate canGoBack />
      <MyText style={"w-4/5 text-center text-h2 text-semiBold"}>
        Afficher un player de son
      </MyText>
      <MyText style={"w-4/5 text-center text-h2 text-semiBold"}>
        Text Input pour écrirer
      </MyText>
      <MyButton
        txt={"Valider"}
        onPress={() =>
          navigation.navigate("Result", {
            nbError: 18,
          })
        }
      />
    </ScreenTemplate>
  );
};

export default FirstTest;
