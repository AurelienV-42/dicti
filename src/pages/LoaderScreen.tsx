import assets from "@assets/index";
import { white } from "@config/colors";
import MyImage from "@src/components/natives/MyImage";
import { useAuth } from "@src/context/Auth";
import { useLifes } from "@src/context/Lifes";
import useAnalytics from "@src/hooks/useAnalytics";
import useManageRoute from "@src/hooks/useManageRoute";
import { initializeRevenueCatApiKeys } from "@src/utils/purchase";
import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

const useInitialization = () => {
  const { identify } = useAnalytics();
  const { user } = useAuth();
  const { init } = useLifes();

  useEffect(() => {
    if (!user) return;

    identify(user.id, user.email || "anonymous@user.com");
    initializeRevenueCatApiKeys(user.id);
    init();
  }, [identify, user, init]);
};

const LoaderScreen: React.FC = () => {
  useInitialization();
  useManageRoute();
  const { loading } = useAuth();

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
