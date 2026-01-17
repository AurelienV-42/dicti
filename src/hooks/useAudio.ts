import { Audio, AVPlaybackStatus } from "expo-av";
import { useEffect, useState } from "react";

type AssetSource = ReturnType<typeof require>;

const useAudio = (mp3File: AssetSource, shouldStop: boolean) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [sound, setSound] = useState<Audio.Sound>();
  const [timeInMs, setTimeInMs] = useState(0);
  const [maxTimeInMs, setMaxTimeInMs] = useState(0);

  useEffect(() => {
    if (!sound) {
      Audio.Sound.createAsync(mp3File).then(({ sound: newSound }) => {
        setSound(newSound);
        newSound
          .getStatusAsync()
          .then((status: AVPlaybackStatus) => {
            if (status.isLoaded) {
              setMaxTimeInMs(status.durationMillis ?? -1);
            }
          })
          .catch((error: Error) => {
            console.warn(error);
          });
      });
    }

    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });

    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [mp3File, sound]);

  useEffect(() => {
    if (shouldStop) sound?.pauseAsync();
  }, [shouldStop, sound]);

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

  const reset = () => {
    sound?.setPositionAsync(0);
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
    progression: timeInMs / maxTimeInMs,
  };
};

export default useAudio;
