import { useNavigation } from "@react-navigation/native";
import { getIsSubscribed } from "@src/utils/purchase";
import resetTo from "@src/utils/resetTo";
import { useEffect } from "react";
import useAppState from "./useAppState";

const useCheckSubscription = () => {
  const navigation = useNavigation();
  const appState = useAppState();

  useEffect(() => {
    if (appState !== "active") return;

    getIsSubscribed().then((isSubscribed) => {
      if (!isSubscribed) resetTo(navigation, "Loader");
    });
  }, [appState, navigation]);
};

export default useCheckSubscription;
