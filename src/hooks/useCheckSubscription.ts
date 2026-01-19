import { useRouter } from "expo-router";
import { getIsSubscribed } from "@utils/purchase";
import { useEffect } from "react";
import useAppState from "@hooks/useAppState";

const useCheckSubscription = (): void => {
  const router = useRouter();
  const appState = useAppState();

  useEffect(() => {
    if (appState !== "active") return;

    getIsSubscribed().then((isSubscribed) => {
      if (!isSubscribed) router.replace("/");
    });
  }, [appState, router]);
};

export default useCheckSubscription;
