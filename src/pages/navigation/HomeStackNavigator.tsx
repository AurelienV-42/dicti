import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoaderScreen from "@src/pages/LoaderScreen";
import Home from "@src/pages/home/Home";
import Introduction from "@src/pages/introduction/Introduction";
import FirstTest from "@src/pages/introduction/firstTest/FirstTest";
import Result from "@src/pages/result/Result";
import React from "react";
import Dictation from "../dictation/Dictation";
import Subscription from "../subscription/Subscription";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Loader" component={LoaderScreen} />
      <HomeStack.Screen name="Introduction" component={Introduction} />
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Subscription" component={Subscription} />
      <HomeStack.Screen name="FirstTest" component={FirstTest} />
      <HomeStack.Screen name="Dictation" component={Dictation} />
      <HomeStack.Screen name="Result" component={Result} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
