import { Linking, Platform, View } from "react-native";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";

const Legals = () => {
  return (
    <View>
      <MyPressable
        className="mb-2 items-center"
        onPress={() =>
          Linking.openURL(
            "https://aurelienvpro.notion.site/Conditions-G-n-rales-d-Utilisation-et-de-Vente-CGUV-98d8fbfda68b4a3b8b7b5b4b64680f99?pvs=74",
          )
        }
      >
        <MyText className="text-xs underline">
          Conditions générales d'utilisation et de vente
        </MyText>
      </MyPressable>
      <MyPressable
        className="mb-2 items-center"
        onPress={() =>
          Linking.openURL(
            "https://aurelienvpro.notion.site/Politique-de-Confidentialit-5ab166a43463473ba7956a913be1e03c",
          )
        }
      >
        <MyText className="text-xs underline">
          Politique de confidentialité
        </MyText>
      </MyPressable>
      <MyText className="text-xs">
        En poursuivant, vous acceptez que votre achat sera facturé à votre
        compte {Platform.OS === "android" ? "Google Play" : "Apple ID"}. Le
        paiement sera prélevé à la confirmation de l'achat. L'abonnement se
        renouvelle automatiquement sauf si vous l'annulez au moins 24 heures
        avant la fin de la période en cours. Vous pouvez gérer et annuler vos
        abonnements en allant dans les paramètres de votre compte après l'achat.
      </MyText>
    </View>
  );
};

export default Legals;
