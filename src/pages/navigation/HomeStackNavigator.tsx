import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoaderScreen from "@src/pages/LoaderScreen";
import Home from "@src/pages/home/Home";
import Introduction from "@src/pages/introduction/Introduction";
import FirstTest from "@src/pages/introduction/firstTest/FirstTest";
import React from "react";
import Dictation from "../dictation/Dictation";
import Profile from "../profile/Profile";
import Subscription from "../subscription/Subscription";
import SignInUp from "@src/pages/auth/SignInUp";

const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Loader" component={LoaderScreen} />
      <HomeStack.Screen name="Introduction" component={Introduction} />
      <HomeStack.Screen
        name="SignIn"
        component={SignInUp}
        initialParams={{ isSignIn: true }}
      />
      <HomeStack.Screen
        name="SignUp"
        component={SignInUp}
        initialParams={{ isSignIn: false }}
      />
      <HomeStack.Screen name="FirstTest" component={FirstTest} />
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="Dictation" component={Dictation} />
      <HomeStack.Screen name="Profile" component={Profile} />
      <HomeStack.Screen name="Subscription" component={Subscription} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
