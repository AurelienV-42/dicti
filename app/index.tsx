import assets from "@assets/index";
import MyImage from "@components/natives/MyImage";
import { white } from "@config/colors";
import useAnalytics from "@hooks/useAnalytics";
import { useAuth } from "@stores/auth.store";
import { useLifes } from "@stores/lifes.store";
import { initializeRevenueCatApiKeys, logInRevenueCat } from "@utils/purchase";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, View } from "react-native";

const useInitialization = (): void => {
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

const Index = (): React.ReactElement => {
  useInitialization();
  const router = useRouter();
  const { user, loading } = useAuth();
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    const manageRoute = async (): Promise<void> => {
      if (loading) return;

      setIsRedirecting(true);

      if (!user) {
        router.replace("/(auth)/introduction");
      } else {
        await logInRevenueCat(user.id, user.email);
        router.replace("/(app)/home");
      }
    };

    manageRoute();
  }, [user, loading, router]);

  return (
    <View className="flex-1 justify-center items-center bg-blue-200">
      <MyImage style="w-full h-full" img={assets.splash} resizeMode="cover" />
      {(loading || isRedirecting) && (
        <View className="absolute">
          <ActivityIndicator size="large" color={white} />
        </View>
      )}
    </View>
  );
};

export default Index;
