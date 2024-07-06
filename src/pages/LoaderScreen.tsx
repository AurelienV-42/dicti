import assets from "@assets/index";
import { white } from "@config/colors";
import { useNavigation } from "@react-navigation/native";
import MyImage from "@src/components/natives/MyImage";
import { useAuth } from "@src/context/Auth";
import useAnalytics from "@src/hooks/useAnalytics";
import resetTo from "@src/utils/resetTo";
import { isSubscribed } from "@src/utils/subscription";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const useManageRoute = () => {
  const navigation = useNavigation();
  const { user, loading } = useAuth(); // Use the auth context

  useEffect(() => {
    const manageRoute = async () => {
      if (loading) return; // Wait for auth to initialize

      const unsubscribedDate = await isSubscribed();

      if (!user) {
        resetTo(navigation, "Introduction");
        return;
      }

      let route = "Home";
      if (!unsubscribedDate) route = "Subscription";

      resetTo(navigation, route);
    };

    manageRoute();
  }, [navigation, user, loading]);
};

const useInitialization = () => {
  const { identify } = useAnalytics();
  const { user } = useAuth(); // Use the auth context

  useEffect(() => {
    if (user) {
      identify(user.id, user.email || "anonymous@user.com");
      // initializeRevenueCatApiKeys(user.id);
    }
  }, [identify, user]);
};

const LoaderScreen: React.FC = () => {
  useManageRoute();
  useInitialization();
  const { loading } = useAuth(); // Use the auth context

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-blue-200">
        <ActivityIndicator size="large" color={white} />
      </View>
    );
  }

  return (
    <View className="flex-1 justify-center items-center bg-blue-200">
      <MyImage style="w-full h-full" img={assets.splash} />
    </View>
  );
};

export default LoaderScreen;
