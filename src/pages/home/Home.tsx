import dictations, { Dictation } from "@config/dictations";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import React from "react";
import { FlatList, View } from "react-native";

const Level = ({ level }: { level: number }) => {
  return (
    <View className="flex-col items-center">
      <MyText style="text-sm text-blue">Niveau</MyText>
      <MyText style="text-h2">{level}</MyText>
    </View>
  );
};

const DisplayDictation = ({ item }: { item: Dictation }) => {
  return (
    <MyPressable
      className={
        "flex-row justify-between items-center bg-light-100 w-full px-4 py-2 mb-4 rounded-xl"
      }
    >
      <View>
        <MyText style="mb-1">{item.title}</MyText>
        <MyText style="text-sm text-blue">
          {item.content.split(" ").length} mots
        </MyText>
      </View>
      <Level level={item.level} />
    </MyPressable>
  );
};

const DisplayDictations = () => {
  return (
    <View>
      <MyText style={"text-h1 mb-4"}>Dictées</MyText>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dictations.sort((a, b) => a.level - b.level)}
        keyExtractor={(_, i) => i.toString()}
        renderItem={DisplayDictation}
      />
    </View>
  );
};

const Home = ({ navigation }: { navigation: any }) => {
  return (
    <ScreenTemplate padding={true}>
      <HeaderTemplate canGoBack={false} />
      <DisplayDictations />
    </ScreenTemplate>
  );
};

export default Home;
