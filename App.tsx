import fonts from "@config/fonts";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "@src/pages/navigation/HomeStackNavigator";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
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
      <NavigationContainer onReady={onLayoutRootView}>
        <HomeStackNavigator />
      </NavigationContainer>
    </>
  );
};

export default App;
