import { useState } from "react";
import { View } from "react-native";
import MyText from "../natives/MyText";
import PlayPause from "./PlayPauseButton";

const SoundPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);

  return (
    <View className="items-center">
      <View className="mb-2">
        <PlayPause isPlaying={isPlaying} pause={pause} play={play} />
      </View>
      <MyText style="font-bold">1:30</MyText>
    </View>
  );
};

export default SoundPlayer;
