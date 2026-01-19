import AsyncStorage from "@react-native-async-storage/async-storage";
import { DEFAULT_NB_LIFES } from "@config/gamification";
import { getIsSubscribed } from "@utils/purchase";
import { Alert } from "react-native";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

interface LifesState {
  value: number;
  display: string;
  isSubscribed: boolean;
  lifes: string;
  decrementLife: () => Promise<boolean>;
  resetLifes: (isAdmin: boolean) => void;
  init: () => Promise<void>;
  setDisplay: (display: string) => void;
}

export const useLifesStore = create<LifesState>()(
  persist(
    (set, get) => ({
      value: DEFAULT_NB_LIFES,
      display: DEFAULT_NB_LIFES.toString(),
      isSubscribed: false,

      get lifes() {
        const state = get();
        return state.isSubscribed ? "∞" : state.display;
      },

      setDisplay: (display: string) => set({ display }),

      decrementLife: async () => {
        const newIsSubscribed = await getIsSubscribed();
        set({ isSubscribed: newIsSubscribed });

        if (newIsSubscribed) return true;

        const { value } = get();
        const decrementedLife = value - 1;

        if (decrementedLife < 0) return false;

        set({ value: decrementedLife, display: "-1" });

        setTimeout(() => {
          const currentValue = get().value;
          set({ display: currentValue.toString() });
        }, 2000);

        return true;
      },

      resetLifes: (isAdmin: boolean) => {
        if (!isAdmin) return;

        Alert.alert(
          "Admin Feature",
          "Vous etes un administrateur, vous pouvez reinitialiser les vies",
          [
            { text: "Annuler", style: "cancel" },
            {
              text: "Reinitialiser",
              onPress: () =>
                set({
                  value: DEFAULT_NB_LIFES,
                  display: DEFAULT_NB_LIFES.toString(),
                }),
            },
          ],
        );
      },

      init: async () => {
        const isSubscribed = await getIsSubscribed();
        set({ isSubscribed });
      },
    }),
    {
      name: "lifes-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({ value: state.value, display: state.display }),
    },
  ),
);

export const useLifes = (): {
  lifes: string;
  decrementLife: () => Promise<boolean>;
  resetLifes: (isAdmin: boolean) => void;
  init: () => Promise<void>;
} => {
  const store = useLifesStore();
  return {
    lifes: store.isSubscribed ? "∞" : store.display,
    decrementLife: store.decrementLife,
    resetLifes: store.resetLifes,
    init: store.init,
  };
};
