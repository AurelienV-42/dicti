import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import AppVersion from "@src/components/AppVersion";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import { setAsyncStorage } from "@src/utils/asyncStorage";
import resetTo from "@src/utils/resetTo";
import { ArrowRight, Icon, Money, SignOut, User } from "phosphor-react-native";
import React from "react";
import { Linking, ScrollView, View } from "react-native";

const Profile = () => {
  const navigation = useNavigation();
  const list: Record<
    string,
    { name: string; onPress: () => void; icon?: Icon }[]
  > = {
    general: [
      {
        name: "Informations personnelles",
        onPress: () => navigation.navigate("PersonalInformation"),
        icon: User,
      },
      {
        name: "Se déconnecter",
        onPress: () => {
          AsyncStorage.clear();
          resetTo(navigation, "Loader");
        },
        icon: SignOut,
      },
      {
        name: "Reset Subscription",
        onPress: () => {
          setAsyncStorage("unsubscribedDate", new Date().toISOString());
          resetTo(navigation, "Loader");
        },
        icon: Money,
      },
    ],
    Légals: [
      {
        name: "Conditions Générales d’Utilisation",
        onPress: () =>
          Linking.openURL(
            "https://www.app-privacy-policy.com/live.php?token=6OzBGsMCtj9urGIPwSqNGyauvAU5cVlf",
          ),
      },
      {
        name: "Données personnelles",
        onPress: () =>
          Linking.openURL(
            "https://www.app-privacy-policy.com/live.php?token=6OzBGsMCtj9urGIPwSqNGyauvAU5cVlf",
          ),
      },
    ],
  };

  return (
    <ScreenTemplate className="px-0">
      <View className="px-4">
        <HeaderTemplate title={"Profil"} canGoBack />
      </View>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      >
        {Object.keys(list).map((category) => (
          <View className="mb-4" key={category}>
            {category !== "general" && (
              <MyText style="text-xl mb-5">{category}</MyText>
            )}
            {list[category].map((item, index) => (
              <MyPressable
                key={index}
                onPress={item.onPress}
                className="bg-light-100 shadow-md items-center justify-between flex-row px-5 py-3 w-full rounded-2xl mb-3"
              >
                <MyText style="">{item.name}</MyText>
                {item.icon ? <item.icon /> : <ArrowRight />}
              </MyPressable>
            ))}
          </View>
        ))}
      </ScrollView>
      <View className="px-4 self-start">
        <AppVersion />
      </View>
    </ScreenTemplate>
  );
};

export default Profile;
