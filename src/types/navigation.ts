import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export type RootStackParamList = {
  Loader: undefined;
  Introduction: undefined;
  SignIn: { isSignIn: boolean };
  SignUp: { isSignIn: boolean };
  FirstTest: undefined;
  Home: undefined;
  Dictation: { dictationID: string };
  Profile: undefined;
  Subscription: undefined;
};

export type RootNavigationProp = NativeStackNavigationProp<RootStackParamList>;

/* eslint-disable @typescript-eslint/no-namespace */
declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
/* eslint-enable @typescript-eslint/no-namespace */
