import fonts from "@config/fonts";
import { NavigationContainer } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import LoaderModal from "@src/components/modals/LoaderModal";
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
import React, { useCallback } from "react";
import { View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontLoaded] = useFonts(fonts);
  useNotifications();

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  if (!fontLoaded) return <View />;

  return (
    <>
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
              <NavigationContainer onReady={onLayoutRootView}>
                <MyPostHogProvider>
                  <LifesProvider>
                    <HomeStackNavigator />
                  </LifesProvider>
                </MyPostHogProvider>
              </NavigationContainer>
            </AuthProvider>
            <LoaderModal />
          </IconContext.Provider>
        </IsLoadingProvider>
      </SafeAreaProvider>
    </>
  );
};

export default Sentry.wrap(App);
