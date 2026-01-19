import useAudio from "@hooks/useAudio";
import DictationPlayer from "@components/soundPlayer/DictationPlayer";

type AssetSource = ReturnType<typeof require>;

interface SoundPlayerProps {
  mp3File: AssetSource;
  shouldStop: boolean;
}

const SoundPlayer = ({ mp3File, shouldStop }: SoundPlayerProps) => {
  const { isPlaying, play, pause, time, reset, progression } = useAudio(
    mp3File,
    shouldStop,
  );

  return (
    <DictationPlayer
      isPlaying={isPlaying}
      play={play}
      pause={pause}
      reset={reset}
      time={time}
      progression={progression}
    />
  );
};

export default SoundPlayer;
