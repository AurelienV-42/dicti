import { CommonActions } from "@react-navigation/native";
import { RootStackParamList } from "@appTypes/navigation";

interface NavigationLike {
  dispatch: (action: ReturnType<typeof CommonActions.reset>) => void;
}

type RouteParams<T extends keyof RootStackParamList> =
  RootStackParamList[T] extends undefined ? undefined : RootStackParamList[T];

const resetTo = <T extends keyof RootStackParamList>(
  navigation: NavigationLike,
  routeName: T,
  params?: RouteParams<T>,
): void => {
  navigation.dispatch(
    CommonActions.reset({
      index: 0,
      routes: [{ name: routeName, params }],
    }),
  );
};

export default resetTo;
