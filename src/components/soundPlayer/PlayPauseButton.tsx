import { dark } from "@config/colors";
import { hapticImpact } from "@src/utils/haptics";
import { Pause, Play } from "phosphor-react-native";
import { useState } from "react";
import { Pressable, View } from "react-native";
import {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  withTiming,
} from "react-native-reanimated";

const AnimatedButton = ({
  animate,
  onPress,
}: {
  animate: boolean;
  onPress: () => void;
}) => {
  const pressed = useSharedValue(false);

  const primaryButtonAnimatedStyle = useAnimatedStyle(
    () => ({
      borderRadius: withTiming(animate ? 5 : 30),
      width: withSpring(animate ? 30 : 60),
      height: withSpring(animate ? 30 : 60),
      transform: [
        { scale: withSpring(pressed.value ? 0.8 : 1, { mass: 0.1 }) },
      ],
    }),
    [animate, pressed.value],
  );

  return (
    <Pressable
      className="items-center justify-center h-20"
      onPress={onPress}
      onPressIn={() => (pressed.value = true)}
      onPressOut={() => {
        const pressOut = setTimeout(() => {
          pressed.value = false;
        }, 500);
        return () => clearTimeout(pressOut);
      }}
    >
      <View className="w-20 h-20 border-4 border-dark rounded-full absolute" />
      {animate ? (
        <Pause size={32} weight="fill" color={dark} />
      ) : (
        <Play size={32} weight="fill" color={dark} />
      )}
      {/* <Animated.View
        className="bg-orange items-center justify-center"
        style={primaryButtonAnimatedStyle}
      /> */}
    </Pressable>
  );
};

interface PlayPauseProps {
  isPlaying: boolean;
  play: () => void;
  pause: () => void;
}

const PlayPause = ({ isPlaying, play, pause }: PlayPauseProps) => {
  const [disable, setDisable] = useState(false);

  const onPress = () => {
    hapticImpact("light");
    if (isPlaying) pause();
    else play();
  };

  return (
    <AnimatedButton
      animate={isPlaying}
      onPress={() => {
        if (disable) return;
        setDisable(true);
        setTimeout(() => setDisable(false), 1000);
        onPress();
      }}
    />
  );
};

export default PlayPause;
