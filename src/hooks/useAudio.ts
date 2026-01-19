import { useAudioPlayer, setAudioModeAsync } from "expo-audio";
import { useEffect, useState } from "react";

type AssetSource = ReturnType<typeof require>;

const useAudio = (mp3File: AssetSource, shouldStop: boolean) => {
  const player = useAudioPlayer(mp3File);
  const [timeInMs, setTimeInMs] = useState(0);

  const isPlaying = player.playing;
  const maxTimeInMs = (player.duration ?? 0) * 1000;

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true });
  }, []);

  useEffect(() => {
    if (shouldStop) player.pause();
  }, [shouldStop, player]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (player.playing) {
        setTimeInMs(player.currentTime * 1000);
      }
    }, 100);
    return () => clearInterval(interval);
  }, [player]);

  const play = () => {
    player.play();
  };

  const pause = () => {
    player.pause();
  };

  const reset = () => {
    player.seekTo(0);
    setTimeInMs(0);
  };

  const getTime = () => {
    const time =
      isPlaying || timeInMs !== 0 ? maxTimeInMs - timeInMs : maxTimeInMs;
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);

    return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
  };

  return {
    isPlaying,
    play,
    pause,
    reset,
    time: getTime(),
    progression: maxTimeInMs > 0 ? timeInMs / maxTimeInMs : 0,
  };
};

export default useAudio;
