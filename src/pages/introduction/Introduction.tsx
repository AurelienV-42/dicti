import LogoVectorized from "@assets/vectorized/LogoVectorized";
import { useNavigation } from "@react-navigation/native";
import ElevatedContainer from "@components/ElevatedContainer";
import MyButton from "@components/natives/MyButton";
import MyText from "@components/natives/MyText";
import ScreenTemplate from "@components/templates/ScreenTemplate";
import React from "react";
import { View } from "react-native";

const Introduction = () => {
  const navigation = useNavigation();

  return (
    <ScreenTemplate>
      <View className="flex-1 justify-center">
        <LogoVectorized width={300} height={300} />
      </View>
      <ElevatedContainer>
        <View className="items-start mb-8">
          <MyText className={"text-2xl font-semibold mb-5"}>
            Améliore ton orthographe quotidiennement
          </MyText>
          <MyText className={"text-base"}>
            Dicti te permet de t'améliorer en orthographe en réalisant des
            dictées quotidiennes. Fixe toi des objectifs et suis ta progression
            !
          </MyText>
        </View>
        <View className="flex-row w-full justify-between">
          <MyButton
            type="secondary"
            className="border-0 px-0"
            txt={"J'ai déjà un compte"}
            onPress={() => navigation.navigate("SignIn", { isSignIn: true })}
          />
          <MyButton
            className="self-end"
            txt={"C'est parti !"}
            onPress={() => navigation.navigate("FirstTest")}
          />
        </View>
      </ElevatedContainer>
    </ScreenTemplate>
  );
};

export default Introduction;
