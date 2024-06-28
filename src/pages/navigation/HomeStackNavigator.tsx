import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoaderScreen from "@src/pages/LoaderScreen";
import Home from "@src/pages/home/Home";
import React from "react";
import FirstTest from "../firstTest/FirstTest";
import Result from "../result/Result";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Loader" component={LoaderScreen} />
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="FirstTest" component={FirstTest} />
      <HomeStack.Screen name="Result" component={Result} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
