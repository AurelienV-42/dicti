import fonts from "@config/fonts";
import { NavigationContainer } from "@react-navigation/native";
import HomeStackNavigator from "@src/pages/navigation/HomeStackNavigator";
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
      <IconContext.Provider
        value={{
          color: "black",
          size: 24,
          weight: "bold",
        }}
      >
        <NavigationContainer onReady={onLayoutRootView}>
          <HomeStackNavigator />
        </NavigationContainer>
      </IconContext.Provider>
    </>
  );
};

export default App;
