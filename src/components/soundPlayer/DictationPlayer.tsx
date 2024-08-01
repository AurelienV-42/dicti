import { View } from "react-native";
import MyPressable from "../natives/MyPressable";
import MyText from "../natives/MyText";
import ProgressionBar from "../ProgressionBar";
import PlayPause from "./PlayPauseButton";

interface DictationPlayerProps {
  isPlaying: any;
  play: any;
  pause: any;
  reset: any;
  time?: string;
  progression?: number;
}

const DictationPlayer = ({
  isPlaying,
  play,
  pause,
  reset,
  time,
  progression,
}: DictationPlayerProps) => {
  return (
    <View
      className={`p-3 rounded-2xl bg-white justify-between items-center flex-row ${progression !== undefined ? "w-full" : "rounded-full aspect-square self-center"}`}
    >
      <PlayPause isPlaying={isPlaying} pause={pause} play={play} />

      {progression !== undefined && (
        <MyPressable
          className="flex-1 h-1"
          hitSlop={{
            top: 40,
            bottom: 40,
          }}
          onPress={reset}
        >
          <ProgressionBar progression={progression} />
        </MyPressable>
      )}
      {time && <MyText className="">{time}</MyText>}
    </View>
  );
};

export default DictationPlayer;
