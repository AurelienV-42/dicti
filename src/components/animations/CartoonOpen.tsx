import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  runOnJS,
  useAnimatedProps,
  useDerivedValue,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Circle, Rect } from "react-native-svg";

const { width, height } = Dimensions.get("window");
const CIRCLE_SIZE = Math.sqrt(width * width + height * height);

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

interface CartoonOpenProps {
  children: React.ReactNode;
}

const CartoonOpen: React.FC<CartoonOpenProps> = ({ children }) => {
  const progress = useSharedValue(0);

  const logProgress = (value: number) => {
    console.log("Animation progress:", value);
  };

  useEffect(() => {
    progress.value = withTiming(
      1,
      {
        duration: 1000,
        easing: Easing.out(Easing.cubic),
      },
      (finished) => {
        if (finished) {
          runOnJS(logProgress)(1);
        }
      },
    );
  }, []);

  const circleRadius = useDerivedValue(() => {
    return progress.value * (CIRCLE_SIZE / 2);
  });

  const animatedCircleProps = useAnimatedProps(() => {
    return {
      r: circleRadius.value,
    };
  });

  return (
    <View style={styles.container}>
      {children}
      <View style={StyleSheet.absoluteFill}>
        <Svg width={width} height={height}>
          <Rect width={width} height={height} fill="#93C5FD" />
          <AnimatedCircle
            cx={width / 2}
            cy={height / 2}
            r={0}
            fill="transparent"
            animatedProps={animatedCircleProps}
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default CartoonOpen;
