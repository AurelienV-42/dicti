import { green, orange, red } from "@config/colors";
import dictations, { Dictation } from "@config/dictations";
import { useNavigation } from "@react-navigation/native";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import useAnalytics from "@src/hooks/useAnalytics";
import { getAsyncStorage, setAsyncStorage } from "@src/utils/asyncStorage";
import { hapticImpact } from "@src/utils/haptics";
import resetTo from "@src/utils/resetTo";
import React, { useEffect, useState } from "react";
import { FlatList, View } from "react-native";

const Level = ({ level }: { level: number }) => {
  let levelName = "";
  let color = "";

  switch (level) {
    case 1:
      levelName = "Primaire";
      color = "#FFC107";
      break;
    case 2:
      levelName = "Collège";
      color = "#FF5722";
      break;
    case 3:
      levelName = "Lycée";
      color = "#2196F3";
      break;
    case 4:
      levelName = "Expert";
      color = "#4CAF50";
      break;
    default:
      break;
  }

  return (
    <View className="flex-col items-center">
      <MyText style="text-sm text-blue">Niveau</MyText>
      <MyText style={`text-sm text-[${color}]`}>{levelName}</MyText>
    </View>
  );
};

const Note = ({ note }: { note: number }) => {
  let color = green;

  if (note <= 5) color = red;
  else if (note <= 15) color = orange;

  return (
    <View
      className={`mr-2 aspect-square px-2 rounded-full items-center justify-center`}
      style={{ backgroundColor: color }}
    >
      <MyText style={`text-sm text-${note <= 15 ? "light-100" : "blue"}`}>
        {note}/20
      </MyText>
    </View>
  );
};

const DisplayDictation = ({
  navigation,
  item,
}: {
  navigation: any;
  item: Dictation;
}) => {
  const [note, setNote] = useState(-1);

  useEffect(() => {
    getAsyncStorage(item.id).then((value) => value && setNote(Number(value)));
  }, [item.id]);

  return (
    <MyPressable
      className={
        "flex-row justify-between items-center bg-light-100 w-full px-4 py-2 mb-4 rounded-xl"
      }
      onPress={() => {
        hapticImpact("medium");
        navigation.navigate("Dictation", { dictationID: item.id });
      }}
    >
      {note !== -1 && <Note note={note} />}

      <View className="flex-1">
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
  const navigation = useNavigation();
  const { capture } = useAnalytics();

  return (
    <View>
      <View className="flex-row items-center justify-between">
        <MyText style={"text-3xl mb-4"}>Dictées</MyText>
        {__DEV__ && (
          <MyPressable
            onPress={() => {
              setAsyncStorage("unsubscribedDate", new Date().toISOString());
              resetTo(navigation, "Loader");
              capture("Test PostHog", { property: "Reset" });
            }}
          >
            <MyText style={""}>Reset subscription</MyText>
          </MyPressable>
        )}
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={dictations.sort((a, b) => a.level - b.level)}
        keyExtractor={(_, i) => i.toString()}
        renderItem={({ item }) => (
          <DisplayDictation navigation={navigation} item={item} />
        )}
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
