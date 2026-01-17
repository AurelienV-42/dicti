import type { CustomerInfo } from "react-native-purchases";
import { create } from "zustand";

interface SubscriptionState {
  customerInfo: CustomerInfo | null;
  isProUser: boolean;
  isLoading: boolean;
  setCustomerInfo: (info: CustomerInfo | null) => void;
  setLoading: (loading: boolean) => void;
}

export const useSubscriptionStore = create<SubscriptionState>((set) => ({
  customerInfo: null,
  isProUser: false,
  isLoading: false,
  setCustomerInfo: (info) =>
    set({
      customerInfo: info,
      isProUser: info
        ? Object.keys(info.entitlements.active).length > 0
        : false,
    }),
  setLoading: (loading) => set({ isLoading: loading }),
}));
