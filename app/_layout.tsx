import "../global.css";
import fonts from "@config/fonts";
import * as Sentry from "@sentry/react-native";
import { ErrorBoundary } from "@components/common/error-boundary";
import { ConnectivityBanners } from "@components/common/connectivity-banners";
import LoaderModal from "@components/modals/LoaderModal";
import UpdateModal from "@components/modals/UpdateModal";
import MyPostHogProvider from "@context/MyPostHog";
import useNotifications from "@hooks/useNotifications";
import { queryClient } from "@lib/react-query";
import { useAuthStore } from "@stores/auth.store";
import { useLifesStore } from "@stores/lifes.store";
import "@utils/sentry";
import { QueryClientProvider } from "@tanstack/react-query";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { Stack } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const RootLayoutContent = (): React.ReactElement | null => {
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
        <MyPostHogProvider>
          <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name="index" />
            <Stack.Screen name="(auth)" />
            <Stack.Screen name="(app)" />
            <Stack.Screen
              name="subscription-modal"
              options={{ presentation: "modal" }}
            />
            <Stack.Screen name="+not-found" />
          </Stack>
          <UpdateModal />
        </MyPostHogProvider>
        <LoaderModal />
      </SafeAreaProvider>
    </View>
  );
};

const RootLayout = (): React.ReactElement => {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <RootLayoutContent />
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default Sentry.wrap(RootLayout);
