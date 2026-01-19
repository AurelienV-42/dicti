import { Link } from "expo-router";
import MyText from "@components/natives/MyText";
import ScreenTemplate from "@components/templates/ScreenTemplate";
import { View } from "react-native";

const NotFound = (): React.ReactElement => {
  return (
    <ScreenTemplate padding>
      <View className="flex-1 justify-center items-center">
        <MyText className="text-xl mb-4">Page non trouvée</MyText>
        <Link href="/">
          <MyText className="text-blue-300">Retour à l'accueil</MyText>
        </Link>
      </View>
    </ScreenTemplate>
  );
};

export default NotFound;
