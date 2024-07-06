import { useNavigation } from "@react-navigation/native";
import BadgeLevel from "@src/components/BadgeLevel";
import ElevatedContainer from "@src/components/ElevatedContainer";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import { useAuth } from "@src/context/Auth";
import { myCaptureException } from "@src/utils/sentry";
import { User } from "phosphor-react-native";
import React from "react";
import { View } from "react-native";
import DisplayDictations from "../dictation/DisplayDictations";

const Home = () => {
  const navigation = useNavigation();
  const { user } = useAuth();

  return (
    <ScreenTemplate>
      <View className="px-4 w-full flex-row items-center justify-between mb-5">
        <View>
          <View className={"mb-2"}>
            <MyText className={"text-xs text-gray-300"}>Bonjour,</MyText>
            {user?.email && (
              <MyText className={"text-xl"}>
                {user.email.replace(/@.*$/, "")} 👋
              </MyText>
            )}
          </View>
          <BadgeLevel level={""} />
        </View>
        <MyPressable
          className="bg-white shadow-md items-center justify-center rounded-full px-3 aspect-square"
          onPress={() => {
            myCaptureException(new Error("First error"));
            navigation.navigate("Profile");
          }}
        >
          <User size={24} />
        </MyPressable>
      </View>
      <ElevatedContainer className="flex-1" padding={false}>
        <DisplayDictations />
      </ElevatedContainer>
    </ScreenTemplate>
  );
};

export default Home;
