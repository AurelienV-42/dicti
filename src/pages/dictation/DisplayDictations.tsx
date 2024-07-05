import dictations from "@config/dictations";
import { useNavigation } from "@react-navigation/native";
import { FlatList } from "react-native";
import DisplayDictation from "./DisplayDictation";

const DisplayDictations = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      contentContainerStyle={{ paddingTop: 16, paddingHorizontal: 16 }}
      showsVerticalScrollIndicator={false}
      data={dictations.sort((a, b) => a.level - b.level)}
      keyExtractor={(_, i) => i.toString()}
      renderItem={({ item }) => (
        <DisplayDictation navigation={navigation} item={item} />
      )}
    />
  );
};

export default DisplayDictations;
