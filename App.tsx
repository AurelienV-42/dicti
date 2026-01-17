import fonts from "@config/fonts";
import { NavigationContainer } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import { ErrorBoundary } from "@src/components/common/error-boundary";
import { ConnectivityBanners } from "@src/components/common/connectivity-banners";
import LoaderModal from "@src/components/modals/LoaderModal";
import UpdateModal from "@src/components/modals/UpdateModal";
import MyPostHogProvider from "@src/context/MyPostHog";
import useNotifications from "@src/hooks/useNotifications";
import { queryClient } from "@src/lib/react-query";
import HomeStackNavigator from "@src/pages/navigation/HomeStackNavigator";
import { useAuthStore } from "@src/stores/auth.store";
import { useLifesStore } from "@src/stores/lifes.store";
import "@src/utils/sentry";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { IconContext } from "phosphor-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const AppContent = (): React.ReactElement | null => {
  const [fontLoaded] = useFonts(fonts);
  const [appIsReady, setAppIsReady] = useState(false);
  const initAuth = useAuthStore((state) => state.initAuth);
  const initLifes = useLifesStore((state) => state.init);
  useNotifications();

  useEffect(() => {
    const unsubscribe = initAuth();
    initLifes();

    async function prepare(): Promise<void> {
      try {
        // Any async initialization can go here
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();

    return () => {
      unsubscribe();
    };
  }, [initAuth, initLifes]);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) await SplashScreen.hideAsync();
  }, [appIsReady]);

  useEffect(() => {
    if (appIsReady) SplashScreen.hideAsync();
  }, [appIsReady]);

  if (!fontLoaded || !appIsReady) return null;

  return (
    <View style={{ flex: 1 }} onLayout={onLayoutRootView}>
      <SafeAreaProvider>
        <ConnectivityBanners />
        <IconContext.Provider
          value={{
            color: "black",
            size: 24,
            weight: "regular",
          }}
        >
          <NavigationContainer>
            <MyPostHogProvider>
              <HomeStackNavigator />
              <UpdateModal />
            </MyPostHogProvider>
          </NavigationContainer>
          <LoaderModal />
        </IconContext.Provider>
      </SafeAreaProvider>
    </View>
  );
};

const App = (): React.ReactElement => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AppContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default Sentry.wrap(App);
