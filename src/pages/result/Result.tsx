import MyButton from "@src/components/natives/MyButton";
import MyText from "@src/components/natives/MyText";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import React from "react";
import { View } from "react-native";

interface ResultProps {
  navigation: any;
  route: any;
}

const Result = ({ navigation, route }: ResultProps) => {
  const { nbError } = route.params;

  return (
    <ScreenTemplate>
      <HeaderTemplate canGoBack />
      <View className="w-full">
        <MyText style={"text-h2 w-full"}>Tu as fait</MyText>
        <MyText style={"text-h2 w-full mb-4"}>
          <MyText style={"text-h1 text-orange"}>{nbError} fautes </MyText>
          {`dans ta dictée`}
        </MyText>
        <MyText style={"text-h2 w-full"}>On améliore ça ?</MyText>
      </View>
      <MyButton
        txt={"S'améliorer"}
        className="w-full"
        onPress={() => navigation.goBack()}
      />
    </ScreenTemplate>
  );
};

export default Result;
