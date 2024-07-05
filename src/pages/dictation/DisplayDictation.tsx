import { Dictation } from "@config/dictations";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import { getAsyncStorage } from "@src/utils/asyncStorage";
import { hapticImpact } from "@src/utils/haptics";
import { useEffect, useState } from "react";
import { DimensionValue, View } from "react-native";

const Level = ({ level }: { level: number }) => {
  let color = "";

  switch (level) {
    case 1:
      color = "#FFC107";
      break;
    case 2:
      color = "#FF5722";
      break;
    case 3:
      color = "#2196F3";
      break;
    case 4:
      color = "#4CAF50";
      break;
    default:
      break;
  }

  return (
    <View
      className={`h-4 w-4 rounded-full`}
      style={{ backgroundColor: color }}
    />
  );
};

const Note = ({ note }: { note: number }) => {
  return <MyText className={`font-bold mr-2`}>{note}/20</MyText>;
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
        "flex-row justify-between items-center bg-white w-full px-4 mb-4 rounded-xl shadow-md"
      }
      onPress={() => {
        hapticImpact("medium");
        navigation.navigate("Dictation", { dictationID: item.id });
      }}
    >
      <View
        className="absolute left-0 top-0 h-full w-2 rounded-l-xl bg-blue-100"
        style={{
          width: ((note / 20) * 100 + "%") as DimensionValue,
        }}
      />
      <View className="flex-1 py-2">
        <MyText className="mb-1 font-semibold">{item.title}</MyText>
        <MyText className="text-xs text-gray-300">
          {item.content.split(" ").length} mots
        </MyText>
      </View>
      {note !== -1 && <Note note={note} />}
      <Level level={item.level} />
    </MyPressable>
  );
};

export default DisplayDictation;
