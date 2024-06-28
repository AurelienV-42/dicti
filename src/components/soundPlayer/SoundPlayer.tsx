import assets from "@assets/index";
import useAudio from "@src/hooks/useAudio";
import { View } from "react-native";
import MyText from "../natives/MyText";
import PlayPause from "./PlayPauseButton";

const SoundPlayer = () => {
  const { isPlaying, play, pause, time } = useAudio(assets.lievre);

  return (
    <View className="items-center">
      <View className="mb-2">
        <PlayPause isPlaying={isPlaying} pause={pause} play={play} />
      </View>
      <MyText style="font-bold">{time}</MyText>
    </View>
  );
};

export default SoundPlayer;
