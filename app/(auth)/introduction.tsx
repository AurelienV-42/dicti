import LogoVectorized from "@assets/vectorized/LogoVectorized";
import ElevatedContainer from "@components/ElevatedContainer";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import ScreenTemplate from "@components/templates/ScreenTemplate";
import { useAuth } from "@stores/auth.store";
import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

const DEV_EMAIL = "aurelienvpro@gmail.com";
const DEV_PASSWORD = "12345678";

const Introduction = (): React.ReactElement => {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [loading, setLoading] = useState<"signIn" | "signUp" | null>(null);

  const handleDevAuth = async (mode: "signIn" | "signUp"): Promise<void> => {
    setLoading(mode);
    try {
      const authFn = mode === "signIn" ? signIn : signUp;
      await authFn(DEV_EMAIL, DEV_PASSWORD);
      router.replace("/");
    } catch (e) {
      console.warn(`Dev ${mode} failed:`, e);
    } finally {
      setLoading(null);
    }
  };

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
        {__DEV__ && (
          <View className="flex-row w-full justify-between mt-4 pt-4 border-t border-gray-200">
            <MyButton
              type="secondary"
              txt="Dev SignIn"
              onPress={() => handleDevAuth("signIn")}
              isLoading={loading === "signIn"}
            />
            <MyButton
              type="secondary"
              txt="Dev SignUp"
              onPress={() => handleDevAuth("signUp")}
              isLoading={loading === "signUp"}
            />
          </View>
        )}
      </ElevatedContainer>
    </ScreenTemplate>
  );
};

export default Introduction;
