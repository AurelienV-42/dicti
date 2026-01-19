import { useEffect } from "react";
import { Keyboard, Platform } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const useKeyboardAnimation = (offset = 0) => {
  const translateY = useSharedValue(0);

  useEffect(() => {
    const showEvent =
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow";
    const hideEvent =
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide";

    const showSub = Keyboard.addListener(showEvent, (e) => {
      translateY.value = withTiming(-e.endCoordinates.height + offset, {
        duration: 250,
      });
    });
    const hideSub = Keyboard.addListener(hideEvent, () => {
      translateY.value = withTiming(0, { duration: 250 });
    });

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, [translateY, offset]);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ translateY: translateY.value }],
  }));

  return animatedStyle;
};

export default useKeyboardAnimation;
