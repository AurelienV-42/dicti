import LogoVectorized from "@assets/vectorized/LogoVectorized";
import ElevatedContainer from "@components/ElevatedContainer";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import ScreenTemplate from "@components/templates/ScreenTemplate";
import { useRouter } from "expo-router";
import { View } from "react-native";

const Introduction = (): React.ReactElement => {
  const router = useRouter();

  return (
    <ScreenTemplate>
      <View className="flex-1 justify-center">
        <LogoVectorized width={300} height={300} />
      </View>
      <ElevatedContainer>
        <View className="items-start mb-8 gap-4">
          <MyText className={"text-2xl font-semibold"}>
            Améliore ton orthographe quotidiennement
          </MyText>
          <MyText className={"text-gray-400"}>
            Dicti te permet de t'améliorer en orthographe en réalisant des
            dictées quotidiennes. Fixe toi des objectifs et suis ta progression
            !
          </MyText>
        </View>
        <View className="flex-row w-full justify-between">
          <MyButton
            type="secondary"
            className="border-0 pl-2"
            txt={"J'ai déjà un compte"}
            onPress={() => router.push("/(auth)/sign-in")}
          />
          <MyButton
            className="self-end"
            txt={"C'est parti !"}
            onPress={() => router.push("/(auth)/first-test")}
          />
        </View>
      </ElevatedContainer>
    </ScreenTemplate>
  );
};

export default Introduction;
