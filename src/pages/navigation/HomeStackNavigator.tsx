import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoaderScreen from "@src/pages/LoaderScreen";
import EmotionFinder from "@src/pages/emotionFinder/EmotionFinder";
import Home from "@src/pages/home/Home";
import React from "react";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Loader" component={LoaderScreen} />
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="EmotionFinder" component={EmotionFinder} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
