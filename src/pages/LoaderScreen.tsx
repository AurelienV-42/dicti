import assets from "@assets/index";
import { ID_FIRST_TEST } from "@config/dictations";
import { useNavigation } from "@react-navigation/native";
import MyImage from "@src/components/natives/MyImage";
import useAnalytics from "@src/hooks/useAnalytics";
import { getAsyncStorage } from "@src/utils/asyncStorage";
import resetTo from "@src/utils/resetTo";
import { isSubscribed } from "@src/utils/subscription";
import React, { useEffect } from "react";
import { View } from "react-native";

const useManageRoute = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const manageRoute = async () => {
      const noteFirstTest = await getAsyncStorage(ID_FIRST_TEST);
      const unsubscribedDate = await isSubscribed();

      let route = "Introduction";

      if (unsubscribedDate) route = "Home";
      else if (noteFirstTest) route = "Subscription";
      resetTo(navigation, route);
    };

    manageRoute();
  }, [navigation]);
};

const useInitialization = () => {
  const { identify } = useAnalytics();

  useEffect(() => {
    // Fetch user
    const userID = "329831-1923iajd1-1231";
    identify(userID, "anonymous@user.com");
    // initializeRevenueCatApiKeys(userID);
  }, [identify]);
};

const LoaderScreen = () => {
  useManageRoute();
  useInitialization();

  return (
    <View className="justify-center items-center bg-blue-200">
      <MyImage style="w-full" img={assets.splash} />
    </View>
  );
};

export default LoaderScreen;
