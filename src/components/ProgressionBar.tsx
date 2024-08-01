import React, { useEffect } from "react";
import { View } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

const ProgressionBar = ({ progression }: { progression: number }) => {
  const widthAnim = useSharedValue(0);

  useEffect(() => {
    widthAnim.value = withTiming(progression, { duration: 1000 });
  }, [progression, widthAnim]);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      width: `${widthAnim.value * 100}%`,
    };
  });

  return (
    <View className="bg-blue-100 flex-1 mx-5 rounded-full justify-center">
      <Animated.View
        className="rounded-l-full h-1.5 bg-blue-200 absolute"
        style={animatedStyle}
      />
    </View>
  );
};

export default ProgressionBar;
