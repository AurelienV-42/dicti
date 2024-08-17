import fonts from "@config/fonts";
import { NavigationContainer } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import LoaderModal from "@src/components/modals/LoaderModal";
import UpdateModal from "@src/components/modals/UpdateModal";
import { AuthProvider } from "@src/context/Auth";
import IsLoadingProvider from "@src/context/IsLoading";
import { LifesProvider } from "@src/context/Lifes";
import MyPostHogProvider from "@src/context/MyPostHog";
import useNotifications from "@src/hooks/useNotifications";
import HomeStackNavigator from "@src/pages/navigation/HomeStackNavigator";
import "@src/utils/sentry";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { IconContext } from "phosphor-react-native";
import React, { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontLoaded] = useFonts(fonts);
  const [appIsReady, setAppIsReady] = useState(false);
  useNotifications();

  useEffect(() => {
    async function prepare() {
      try {
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }

    prepare();
  }, []);

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
        <IsLoadingProvider>
          <IconContext.Provider
            value={{
              color: "black",
              size: 24,
              weight: "regular",
            }}
          >
            <AuthProvider>
              <NavigationContainer>
                <MyPostHogProvider>
                  <LifesProvider>
                    <HomeStackNavigator />
                    <UpdateModal />
                  </LifesProvider>
                </MyPostHogProvider>
              </NavigationContainer>
            </AuthProvider>
            <LoaderModal />
          </IconContext.Provider>
        </IsLoadingProvider>
      </SafeAreaProvider>
    </View>
  );
};

export default Sentry.wrap(App);
