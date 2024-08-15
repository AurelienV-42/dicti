import { Dictation } from "@config/dictations";
import { useNavigation } from "@react-navigation/native";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import { useAuth } from "@src/context/Auth";
import useIsSubscribed from "@src/hooks/useIsSubscribed";
import { hapticImpact } from "@src/utils/haptics";
import { Alert, DimensionValue, View } from "react-native";

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

const Grade = ({ grade }: { grade: number }) => {
  return <MyText className={`font-bold mr-2`}>{grade}/20</MyText>;
};

const DisplayDictation = ({ item }: { item: Dictation }) => {
  const navigation = useNavigation();
  const { isSubscribed } = useIsSubscribed();
  const { isAdmin } = useAuth();

  return (
    <MyPressable
      className={
        "flex-row justify-between items-center bg-white w-full mb-4 rounded-xl shadow-md"
      }
      onPress={() => {
        hapticImpact("medium");
        if (isAdmin) {
          Alert.alert(
            "Dictée",
            "Vous êtes administrateur, souhaitez-vous avoir le parcours utilisateur ?",
            [
              {
                text: "Non, bypass le paiement",
                onPress: () =>
                  navigation.navigate("Dictation", { dictationID: item.id }),
                style: "cancel",
              },
              {
                text: "Oui",
                onPress: () => navigation.navigate("Subscription"),
              },
            ],
          );
          return;
        }
        if (!isSubscribed) {
          navigation.navigate("Subscription");
          return;
        }
        navigation.navigate("Dictation", { dictationID: item.id });
      }}
    >
      {item.grade !== undefined && (
        <View
          className={`absolute left-0 top-0 h-full w-2 rounded-l-xl bg-blue-200 opacity-50 ${item.grade === 20 && "rounded-r-xl"}`}
          style={{
            width: ((item.grade / 20) * 100 + "%") as DimensionValue,
          }}
        />
      )}
      <View className="ml-4 flex-1 py-2">
        <MyText className="mb-1 font-semibold">{item.title}</MyText>
        <MyText className="text-xs text-gray-300">
          {item.content.split(" ").length} mots
        </MyText>
      </View>
      <View className="flex-row items-center mr-4">
        {item.grade !== undefined && item.grade !== -1 && (
          <Grade grade={item.grade} />
        )}
        <Level level={item.level} />
      </View>
    </MyPressable>
  );
};

export default DisplayDictation;
