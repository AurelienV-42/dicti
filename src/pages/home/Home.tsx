import MyButton from "@src/components/natives/MyButton";
import MyText from "@src/components/natives/MyText";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import React from "react";

const Home = ({ navigation }: { navigation: any }) => {
  return (
    <ScreenTemplate padding={true} className="justify-start">
      <MyText style="text-h2">Bienvenue</MyText>
      <MyText style={"text-dark text-h1 text-bold"}>Ariane</MyText>
      <MyButton
        txt={"Try to go to next page"}
        onPress={() => navigation.navigate("EmotionFinder")}
      />
    </ScreenTemplate>
  );
};

export default Home;
