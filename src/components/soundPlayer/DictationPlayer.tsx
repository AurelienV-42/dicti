import { View } from "react-native";
import MyText from "../natives/MyText";
import ProgressionBar from "../ProgressionBar";
import PlayPause from "./PlayPauseButton";

interface DictationPlayerProps {
  isPlaying: any;
  play: any;
  pause: any;
  time?: string;
  progression?: number;
}

const DictationPlayer = ({
  isPlaying,
  play,
  pause,
  time,
  progression,
}: DictationPlayerProps) => {
  return (
    <View className="p-3 rounded-2xl bg-white justify-between items-center flex-row w-full">
      <PlayPause isPlaying={isPlaying} pause={pause} play={play} />

      {progression !== undefined && (
        <ProgressionBar progression={progression} />
      )}
      {time && <MyText className="">{time}</MyText>}
    </View>
  );
};

export default DictationPlayer;
