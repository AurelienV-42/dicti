import { Alert, Platform } from "react-native";
import Purchases, { LOG_LEVEL, PurchasesPackage } from "react-native-purchases";

const APIKeys = {
  apple: process.env.REVENUE_CAT_IOS_KEY ?? "",
  google: process.env.REVENUE_CAT_ANDROID_KEY ?? "",
};

export const initializeRevenueCatApiKeys = (userId: string): void => {
  Purchases.setLogLevel(__DEV__ ? LOG_LEVEL.DEBUG : LOG_LEVEL.INFO);
  Purchases.configure({
    apiKey: Platform.OS === "android" ? APIKeys.google : APIKeys.apple,
    appUserID: userId,
  });
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

export const getPackages = async () => {
  try {
    const offerings = await Purchases.getOfferings();
    const currentOffering = offerings?.current;

    if (!offerings || !currentOffering?.availablePackages) return [];

    return currentOffering.availablePackages.map((p) => {
      const characterCurrency = p.product.priceString[0] === "€" ||
          p.product.priceString[0] === "$" ||
          p.product.priceString[0] === "£" ||
          p.product.priceString[0] === "¥" ||
          p.product.priceString[0] === "₹" ||
          p.product.priceString[0] === "₽" ||
          p.product.priceString[0] === "₩" ||
          p.product.priceString[0] === "₺" ||
          p.product.priceString[0] === "₴" ||
          p.product.priceString[0] === "₦" ||
          p.product.priceString[0] === "฿"
        ? p.product.priceString[0]
        : p.product.priceString[p.product.priceString.length - 1];

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
        priceString: `${
          Number(p.product.price).toFixed(
            2,
          )
        }${characterCurrency}`,
        priceByMonthString: `${
          (p.product.price / nbMonths)
            .toFixed(3)
            .slice(0, -1)
        }${characterCurrency}`,
      };
    });
  } catch (error: any) {
    console.error("Error in getPackages:", error, error.code);
  }
};

const t = (key: string) => key;

export const pay = async (
  selectedPackage: PurchasesPackage,
): Promise<boolean> => {
  try {
    // Make purchase
    const { customerInfo } = await Purchases.purchasePackage(selectedPackage);

    if (customerInfo.entitlements.all["Default"]?.isActive) {
      Alert.alert(
        t("account:payment.success"),
        t("account:payment.successMessage"),
      );
      return true;
    } else {
      Alert.alert(
        t("account:payment.failure"),
        t("account:payment.failureMessage"),
      );
      return false;
    }
  } catch (error: any) {
    console.warn("ERROR", error);
    if (error.message.includes("cancel")) return false;

    Alert.alert(
      t("account:payment.failure"),
      t("account:payment.failureMessage"),
    );
    return false;
  }
};

export const getIsSubscribed = async (): Promise<boolean> => {
  try {
    const purchaserInfo = await Purchases.getCustomerInfo();
    return purchaserInfo.entitlements.all["Default"]?.isActive ?? false;
  } catch (error: any) {
    console.error("Error in getIsSubscribed:", error, error.code);
    return false;
  }
};
