import { Audio } from "expo-av";
import { useEffect, useState } from "react";

const useAudio = (mp3File: any, shouldStop: boolean) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();
  const [timeInMs, setTimeInMs] = useState(0);
  const [maxTimeInMs, setMaxTimeInMs] = useState(0);

  const play = () => {
    sound?.setOnPlaybackStatusUpdate((status) => {
      if (!status.isLoaded) {
        setIsPlaying(false);
      } else {
        setIsPlaying(status.isPlaying);
        setTimeInMs(status.positionMillis);
      }
    });
    sound?.playAsync();
  };

  const pause = () => {
    sound?.pauseAsync();
  };

  const getTime = () => {
    const time = isPlaying || timeInMs !== 0
      ? maxTimeInMs - timeInMs
      : maxTimeInMs;
    const minutes = Math.floor(time / 60000);
    const seconds = ((time % 60000) / 1000).toFixed(0);

    return `${minutes}:${+seconds < 10 ? "0" : ""}${seconds}`;
  };

  useEffect(() => {
    if (!sound) {
      Audio.Sound.createAsync(mp3File).then(({ sound }) => {
        setSound(sound);
        sound
          .getStatusAsync()
          .then((status: any) => {
            setMaxTimeInMs(status.durationMillis ?? -1);
          })
          .catch((error: any) => {
            console.warn(error);
          });
      });
    }

    return sound
      ? () => {
        sound.unloadAsync();
      }
      : undefined;
  }, [mp3File, sound]);

  useEffect(() => {
    if (shouldStop) sound?.pauseAsync();
  }, [shouldStop, sound]);

  return {
    isPlaying,
    play,
    pause,
    time: getTime(),
    progression: timeInMs / maxTimeInMs,
  };
};

export default useAudio;
