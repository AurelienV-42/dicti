import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoaderScreen from "@pages/LoaderScreen";
import Home from "@pages/home/Home";
import Introduction from "@pages/introduction/Introduction";
import FirstTest from "@pages/introduction/firstTest/FirstTest";
import { RootStackParamList } from "@appTypes/navigation";
import Dictation from "@pages/dictation/Dictation";
import Profile from "@pages/profile/Profile";
import Subscription from "@pages/subscription/Subscription";
import SignInUp from "@pages/auth/SignInUp";

const HomeStack = createNativeStackNavigator<RootStackParamList>();

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
