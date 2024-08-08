import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import AppVersion from "@src/components/AppVersion";
import ElevatedContainer from "@src/components/ElevatedContainer";
import MyPressable from "@src/components/natives/MyPressable";
import MyText from "@src/components/natives/MyText";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import { useAuth } from "@src/context/Auth";
import deleteAuthUser from "@src/queries/deleteAuthUser.query";
import resetTo from "@src/utils/resetTo";
import { ArrowRight, Envelope, SignOut, Trash } from "phosphor-react-native";
import React from "react";
import { Alert, Linking, ScrollView, View } from "react-native";

const Profile = () => {
  const navigation = useNavigation();
  const { signOut } = useAuth();

  const signOutWithThen = () => {
    signOut().then(() => {
      AsyncStorage.clear();
      resetTo(navigation, "Loader");
    });
  };

  const list: {
    [key: string]: {
      name: string;
      onPress: () => void;
      icon?: React.FC;
    }[];
  } = {
    general: [
      // {
      //   name: "Informations personnelles",
      //   onPress: () => navigation.navigate("PersonalInformation"),
      //   icon: User,
      // },
      {
        name: "Se déconnecter",
        onPress: () => {
          Alert.alert("Déconnexion", "Es-tu sûr de vouloir te déconnecter ?", [
            {
              text: "Annuler",
              style: "cancel",
            },
            {
              text: "Se déconnecter",
              onPress: signOutWithThen,
            },
          ]);
        },
        icon: SignOut,
      },
      {
        name: "Supprimer mon compte",
        onPress: () => {
          Alert.alert(
            "Supprimer mon compte",
            "Es-tu sûr de vouloir supprimer ton compte ?",
            [
              {
                text: "Annuler",
                style: "cancel",
              },
              {
                text: "Supprimer",
                onPress: () => {
                  deleteAuthUser()
                    .then(() => {
                      AsyncStorage.clear();
                      Alert.alert(
                        "Compte supprimé",
                        "Ton compte a bien été supprimé.",
                        [
                          {
                            text: "OK",
                            onPress: signOutWithThen,
                          },
                        ],
                      );
                    })
                    .catch((error) => {
                      Alert.alert("Erreur", error.message);
                    });
                },
              },
            ],
          );
        },
        icon: Trash,
      },
      // {
      //   name: "Subscription",
      //   onPress: () => {
      //     navigation.navigate("Subscription");
      //   },
      //   icon: Money,
      // },
      {
        name: "Contact",
        onPress: () => {
          Linking.openURL("mailto:aurelienvpro@gmail.com");
        },
        icon: Envelope,
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
    <ScreenTemplate edges={["top"]} className="px-0">
      <View className="px-4">
        <HeaderTemplate title={"Profil"} canGoBack />
      </View>
      <ElevatedContainer className="flex-1" padding={false}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingTop: 20,
            paddingHorizontal: 16,
          }}
        >
          {Object.keys(list).map((category) => (
            <View className="mb-4" key={category}>
              {category !== "general" && (
                <MyText className="text-xl mb-5">{category}</MyText>
              )}
              {list[category].map((item, index) => (
                <MyPressable
                  key={index}
                  onPress={item.onPress}
                  className="bg-blue-100 shadow-md items-center justify-between flex-row px-5 py-3 w-full rounded-2xl mb-3"
                >
                  <MyText className="">{item.name}</MyText>
                  {item.icon ? <item.icon /> : <ArrowRight />}
                </MyPressable>
              ))}
            </View>
          ))}
        </ScrollView>
        <View className="px-4">
          <AppVersion />
        </View>
      </ElevatedContainer>
    </ScreenTemplate>
  );
};

export default Profile;
