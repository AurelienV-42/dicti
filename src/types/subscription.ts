import { PurchasesPackage } from "react-native-purchases";

export interface SubscriptionPackage extends PurchasesPackage {
  nbMonths: number;
  priceString: string;
  priceByMonthString: string;
}
