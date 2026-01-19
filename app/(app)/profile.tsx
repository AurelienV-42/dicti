import AppVersion from "@components/AppVersion";
import ElevatedContainer from "@components/ElevatedContainer";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import HeaderTemplate from "@components/templates/HeaderTemplate";
import ScreenTemplate from "@components/templates/ScreenTemplate";
import deleteAuthUser from "@queries/deleteAuthUser.query";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "@stores/auth.store";
import { useRouter } from "expo-router";
import {
  ArrowRight,
  Banknote,
  LogOut,
  Mail,
  Trash2,
} from "lucide-react-native";
import React from "react";
import { Alert, Linking, ScrollView, View } from "react-native";

const Profile = (): React.ReactElement => {
  const router = useRouter();
  const { isAdmin, signOut } = useAuth();

  const signOutWithThen = (): void => {
    signOut().then(() => {
      AsyncStorage.clear();
      router.replace("/");
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
      {
        name: "Contact",
        onPress: () => {
          Linking.openURL("mailto:aurelienvpro@gmail.com");
        },
        icon: Mail,
      },
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
        icon: LogOut,
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
        icon: Trash2,
      },
    ],
    Légals: [
      {
        name: "Conditions Générales d'Utilisation",
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

  if (isAdmin) {
    list.general.push({
      name: "Abonnement",
      onPress: () => {
        router.push("/subscription-modal");
      },
      icon: Banknote,
    });
  }

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
                  <MyText
                    className={`${item.name === "Supprimer mon compte" ? "text-red-300" : ""}`}
                  >
                    {item.name}
                  </MyText>
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
