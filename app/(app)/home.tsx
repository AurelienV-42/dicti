import { useRouter } from "expo-router";
import ElevatedContainer from "@components/ElevatedContainer";
import DisplayLifes from "@components/gamification/DisplayLifes";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import ScreenTemplate from "@components/templates/ScreenTemplate";
import { useAuth } from "@stores/auth.store";
import { uppercaseFirstLetter } from "@utils/string";
import { User } from "lucide-react-native";
import { View } from "react-native";
import DisplayDictations from "@screens/dictation/DisplayDictations";

const showNiceEmail = (email: string): string => {
  return email
    .split("@")[0]
    .split(".")
    .map((name) => uppercaseFirstLetter(name))
    .join(" ");
};

const Home = (): React.ReactElement => {
  const router = useRouter();
  const { user } = useAuth();

  return (
    <ScreenTemplate>
      <View className="px-4 w-full flex-row items-center justify-between mb-5">
        <View>
          <View className={"mb-2"}>
            <MyText className={"text-xs text-gray-400"}>Bonjour,</MyText>
            {user?.email && (
              <MyText className={"text-xl"}>
                {showNiceEmail(user.email)} 👋
              </MyText>
            )}
          </View>
        </View>
        <View className="flex-row items-center justify-center">
          <DisplayLifes />

          <MyPressable
            className="ml-2 bg-white shadow-md items-center justify-center rounded-full px-3 aspect-square"
            onPress={() => {
              router.push("/(app)/profile");
            }}
          >
            <User size={24} />
          </MyPressable>
        </View>
      </View>
      <ElevatedContainer className="flex-1" padding={false}>
        <DisplayDictations />
      </ElevatedContainer>
    </ScreenTemplate>
  );
};

export default Home;
