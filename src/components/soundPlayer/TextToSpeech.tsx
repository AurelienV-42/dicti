import * as Speech from "expo-speech";
import { useEffect, useState } from "react";
import { View } from "react-native";
import MyText from "../natives/MyText";
import PlayPause from "./PlayPauseButton";

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
    <View className="items-center">
      <MyText style="mb-6">
        Cette dictée n'est pas encore disponible avec nos belles voix, ça arrive
        !
      </MyText>
      <View className="mb-2">
        <PlayPause isPlaying={isPlaying} pause={pause} play={play} />
      </View>
    </View>
  );
};

export default TextToSpeech;
