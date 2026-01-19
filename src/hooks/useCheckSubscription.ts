import { useNavigation } from "@react-navigation/native";
import { getIsSubscribed } from "@utils/purchase";
import resetTo from "@utils/resetTo";
import { useEffect } from "react";
import useAppState from "@hooks/useAppState";

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
