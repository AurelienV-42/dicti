import useAudio from "@src/hooks/useAudio";
import DictationPlayer from "./DictationPlayer";

const SoundPlayer = ({
  mp3File,
  shouldStop,
}: {
  mp3File: any;
  shouldStop: boolean;
}) => {
  const { isPlaying, play, pause, time, progression } = useAudio(
    mp3File,
    shouldStop,
  );

  return (
    <DictationPlayer
      isPlaying={isPlaying}
      play={play}
      pause={pause}
      time={time}
      progression={progression}
    />
  );
};

export default SoundPlayer;
