import { DEFAULT_NB_LIFES } from "@config/gamification";
import { useAuth } from "@src/context/Auth";
import useIsSubscribed from "@src/hooks/useIsSubscribed";
import { getAsyncStorage, setAsyncStorage } from "@src/utils/asyncStorage";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Alert } from "react-native";

interface LifesContextType {
  lifes: string;
  decrementLife: () => Promise<boolean>;
  resetLifes: () => void;
}

type Life = {
  value: number;
  display: string;
};

const LifesContext = createContext<LifesContextType | undefined>(undefined);

export const LifesProvider = ({ children }: { children: React.ReactNode }) => {
  const [lifesState, setLifesState] = useState<Life>({
    value: DEFAULT_NB_LIFES,
    display: DEFAULT_NB_LIFES.toString(),
  });
  const { isSubscribed } = useIsSubscribed();
  const { isAdmin } = useAuth();

  useEffect(() => {
    const initLifes = async () => {
      const storedLifes = await getAsyncStorage("lifes");
      if (storedLifes) {
        const numValue = Number(storedLifes);
        setLifesState({ value: numValue, display: storedLifes });
      }
    };
    initLifes();
  }, []);

  const updateLifes = async (newValue: number) => {
    await setAsyncStorage("lifes", newValue.toString());
    setLifesState({ value: newValue, display: newValue.toString() });
  };

  const decrementLife = async () => {
    if (isSubscribed) return true;
    const decrementedLife = lifesState.value - 1;
    if (decrementedLife < 0) {
      return false;
    }
    await updateLifes(decrementedLife);
    setLifesState((prev) => ({ ...prev, display: "-1" }));
    setTimeout(
      () =>
        setLifesState((prev) => ({ ...prev, display: prev.value.toString() })),
      2000,
    );
    return true;
  };

  const resetLifes = () => {
    if (!isAdmin) return;
    Alert.alert(
      "Admin Feature",
      "Vous êtes un administrateur, vous pouvez réinitialiser les vies",
      [
        {
          text: "Annuler",
          style: "cancel",
        },
        {
          text: "Réinitialiser",
          onPress: () => updateLifes(DEFAULT_NB_LIFES),
        },
      ],
    );
  };

  const value = {
    lifes: isSubscribed ? "∞" : lifesState.display,
    decrementLife,
    resetLifes,
  };

  return (
    <LifesContext.Provider value={value}>{children}</LifesContext.Provider>
  );
};

export const useLifes = (): LifesContextType => {
  const context = useContext(LifesContext);
  if (context === undefined) {
    throw new Error("useLifes must be used within a LifesProvider");
  }
  return context;
};
