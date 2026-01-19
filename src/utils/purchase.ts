import { SubscriptionPackage } from "@appTypes/subscription";
import getCurrencySymbolFromPrice from "@utils/getCurrencySymbolFromPrice";
import { Alert, Platform } from "react-native";
import Purchases, { LOG_LEVEL } from "react-native-purchases";

const APIKeys = {
  apple: process.env.EXPO_PUBLIC_REVENUE_CAT_IOS_KEY ?? "",
  google: process.env.EXPO_PUBLIC_REVENUE_CAT_ANDROID_KEY ?? "",
};

let isConfigured = false;

export const initializeRevenueCatApiKeys = (userId: string): void => {
  Purchases.setLogLevel(LOG_LEVEL.INFO); // __DEV__ ? LOG_LEVEL.DEBUG : 
  Purchases.configure({
    apiKey: Platform.OS === "android" ? APIKeys.google : APIKeys.apple,
    appUserID: userId,
  });
  isConfigured = true;
};

export const logInRevenueCat = async (
  userId: string,
  userEmail?: string,
): Promise<void> => {
  await Purchases.logIn(userId);
  if (userEmail) {
    await Purchases.setAttributes({
      email: userEmail,
    });
  }
};

export const getPackages = async (): Promise<SubscriptionPackage[]> => {
  try {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings?.current;

    if (!offerings || !currentOffering?.availablePackages) return [];

    return currentOffering.availablePackages.map((p) => {
      const characterCurrency = getCurrencySymbolFromPrice(
        p.product.priceString,
      );

      let nbMonths = 3;
      switch (p.packageType) {
        case "MONTHLY":
          nbMonths = 1;
          break;
        case "THREE_MONTH":
          nbMonths = 3;
          break;
        case "ANNUAL":
          nbMonths = 12;
          break;
        default:
          nbMonths = 1;
          break;
      }

      return {
        ...p,
        nbMonths,
        priceString: `${Number(p.product.price).toFixed(
          2,
        )}${characterCurrency}`,
        priceByMonthString: `${(p.product.price / nbMonths)
          .toFixed(3)
          .slice(0, -1)}${characterCurrency}`,
      };
    });
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error("Error in getPackages:", err.message, err.code);
    return [];
  }
};

const t = (key: string) => key;

export const pay = async (
  selectedPackage: SubscriptionPackage | undefined,
  onSuccess: () => void,
): Promise<void> => {
  if (!selectedPackage) return;
  return Purchases.purchasePackage(selectedPackage)
    .then(({ customerInfo }) => {
      if (customerInfo.entitlements.all["Subscription"]?.isActive) {
        Alert.alert(
          "Bravo",
          "Tu as souscrit à l'abonnement, tu peux maintenant profiter de toutes les fonctionnalités de l'application",
          [
            {
              text: "OK",
              onPress: onSuccess,
            },
          ],
        );
      } else {
        Alert.alert(
          "Erreur",
          "Une erreur est survenue lors de la souscription à l'abonnement, nous en sommes informer. Tu peux réessayer plus tard.",
        );
      }
    })
    .catch((error: Error) => {
      console.warn("ERROR", error);
      if (error.message.includes("cancel")) return;

      Alert.alert(
        t("account:payment.failure"),
        t("account:payment.failureMessage"),
      );
    });
};

export const getIsSubscribed = async (): Promise<boolean> => {
  if (!isConfigured) {
    return false;
  }

  try {
    const purchaserInfo = await Purchases.getCustomerInfo();
    return purchaserInfo.entitlements.all["Subscription"]?.isActive ?? false;
  } catch (error) {
    const err = error as Error & { code?: string };
    console.error("Error in getIsSubscribed:", err.message, err.code);
    return false;
  }
};
