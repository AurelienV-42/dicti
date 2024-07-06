import fonts from "@config/fonts";
import { NavigationContainer } from "@react-navigation/native";
import * as Sentry from "@sentry/react-native";
import LoaderModal from "@src/components/modals/LoaderModal";
import { AuthProvider } from "@src/context/Auth";
import IsLoadingProvider from "@src/context/IsLoading";
import MyPostHogProvider from "@src/context/MyPostHog";
import HomeStackNavigator from "@src/pages/navigation/HomeStackNavigator";
import "@src/utils/sentry";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { IconContext } from "phosphor-react-native";
import React, { useCallback } from "react";
import { View } from "react-native";

SplashScreen.preventAutoHideAsync();

const App = () => {
  const [fontLoaded] = useFonts(fonts);

  const onLayoutRootView = useCallback(async () => {
    await SplashScreen.hideAsync();
  }, []);

  if (!fontLoaded) return <View />;

  return (
    <>
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
                <HomeStackNavigator />
              </MyPostHogProvider>
            </NavigationContainer>
          </AuthProvider>
          <LoaderModal />
        </IconContext.Provider>
      </IsLoadingProvider>
    </>
  );
};

export default Sentry.wrap(App);
