import { Audio } from "expo-av";
import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { View } from "react-native";
import MyText from "../natives/MyText";
import DictationPlayer from "./DictationPlayer";

const useTextToSpeech = (content: string, shouldStop: boolean) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const play = async () => {
    setIsPlaying(true);
    Speech.speak(content, {
      language: "fr-FR", // Définir la langue à Français
      rate: 0.1, // Définir la vitesse de lecture
      voice: "com.apple.voice.compact.fr-CA.Amelie",
      onDone: () => setIsPlaying(false),
      onStopped: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  const pause = () => {
    setIsPlaying(false);
    Speech.stop();
  };

  useEffect(() => {
    Audio.setAudioModeAsync({
      playsInSilentModeIOS: true,
    });
    if (shouldStop) pause();
  }, [shouldStop]);

  return { isPlaying, play, pause };
};

const TextToSpeech = ({
  content,
  shouldStop,
}: {
  content: string;
  shouldStop: boolean;
}) => {
  const { isPlaying, play, pause } = useTextToSpeech(content, shouldStop);

  return (
    <View>
      <MyText className="mb-6 text-white font-semibold">
        Cette dictée n'est pas encore disponible avec nos belles voix, ça arrive
        !
      </MyText>
      <DictationPlayer isPlaying={isPlaying} play={play} pause={pause} />
    </View>
  );
};

export default TextToSpeech;
