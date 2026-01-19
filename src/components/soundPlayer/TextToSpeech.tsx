import MyText from "@components/natives/MyText";
import DictationPlayer from "@components/soundPlayer/DictationPlayer";
import { useSettingsStore, VoiceGender } from "@stores/settings.store";
import { setAudioModeAsync } from "expo-audio";
import * as Speech from "expo-speech";
import { User, UserCircle } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Alert, Pressable, View } from "react-native";

const VOICES = {
  female: {
    premium: "com.apple.voice.premium.fr-FR.Audrey",
    enhanced: "com.apple.voice.enhanced.fr-FR.Audrey",
  },
  male: {
    premium: "com.apple.voice.premium.fr-FR.Thomas",
    enhanced: "com.apple.voice.enhanced.fr-FR.Thomas",
  },
  fallback: "com.apple.voice.compact.fr-CA.Amelie",
} as const;

const RATE = 0.2;

const findBestVoice = async (gender: VoiceGender): Promise<string> => {
  const availableVoices = await Speech.getAvailableVoicesAsync();
  const voiceIds = availableVoices.map((v) => v.identifier);

  const genderVoices = VOICES[gender];
  if (voiceIds.includes(genderVoices.premium)) return genderVoices.premium;
  if (voiceIds.includes(genderVoices.enhanced)) return genderVoices.enhanced;

  return VOICES.fallback;
};

const checkEnhancedAvailable = async (): Promise<boolean> => {
  const availableVoices = await Speech.getAvailableVoicesAsync();
  const voiceIds = availableVoices.map((v) => v.identifier);

  return (
    voiceIds.includes(VOICES.female.enhanced) ||
    voiceIds.includes(VOICES.female.premium) ||
    voiceIds.includes(VOICES.male.enhanced) ||
    voiceIds.includes(VOICES.male.premium)
  );
};

const showEnhancedVoiceAlert = (onDismiss: () => void): void => {
  Alert.alert(
    "Ameliorer la qualite audio",
    "Pour une meilleure experience, telechargez les voix ameliorees dans Reglages > Accessibilite > Contenu enonce > Voix > Francais",
    [{ text: "OK", onPress: onDismiss }],
  );
};

const useTextToSpeech = (content: string, shouldStop: boolean) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { voiceGender, enhancedVoiceAlertShown, setEnhancedVoiceAlertShown } =
    useSettingsStore();

  const play = useCallback(async () => {
    setIsPlaying(true);

    const voice = await findBestVoice(voiceGender);
    const isUsingFallback = voice === VOICES.fallback;

    if (isUsingFallback && !enhancedVoiceAlertShown) {
      const hasEnhanced = await checkEnhancedAvailable();
      if (!hasEnhanced) {
        showEnhancedVoiceAlert(() => setEnhancedVoiceAlertShown());
      }
    }

    Speech.speak(content, {
      language: "fr-FR",
      rate: RATE,
      voice,
      onDone: () => setIsPlaying(false),
      onStopped: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  }, [
    content,
    voiceGender,
    enhancedVoiceAlertShown,
    setEnhancedVoiceAlertShown,
  ]);

  const pause = useCallback(() => {
    setIsPlaying(false);
    Speech.stop();
  }, []);

  useEffect(() => {
    setAudioModeAsync({ playsInSilentMode: true });
    if (shouldStop) pause();
  }, [shouldStop, pause]);

  useEffect(() => {
    return () => {
      Speech.stop();
    };
  }, []);

  return { isPlaying, play, pause };
};

interface VoiceToggleProps {
  gender: VoiceGender;
  onToggle: (gender: VoiceGender) => void;
}

const VoiceToggle = ({ gender, onToggle }: VoiceToggleProps) => {
  const handleToggle = () => {
    onToggle(gender === "female" ? "male" : "female");
  };

  return (
    <Pressable
      onPress={handleToggle}
      className="flex-row items-center gap-2 mb-4"
    >
      <View className="flex-row bg-white/20 rounded-full p-1">
        <View
          className={`p-2 rounded-full ${gender === "female" ? "bg-white" : ""}`}
        >
          <UserCircle
            size={20}
            color={gender === "female" ? "#1a1a1a" : "#ffffff"}
          />
        </View>
        <View
          className={`p-2 rounded-full ${gender === "male" ? "bg-white" : ""}`}
        >
          <User size={20} color={gender === "male" ? "#1a1a1a" : "#ffffff"} />
        </View>
      </View>
      <MyText className="text-white/70 text-sm">
        {gender === "female" ? "Audrey" : "Thomas"}
      </MyText>
    </Pressable>
  );
};

interface TextToSpeechProps {
  content: string;
  shouldStop: boolean;
}

const TextToSpeech = ({ content, shouldStop }: TextToSpeechProps) => {
  const { isPlaying, play, pause } = useTextToSpeech(content, shouldStop);
  const { voiceGender, setVoiceGender } = useSettingsStore();

  return (
    <View>
      <MyText className="mb-4 text-white font-semibold">
        Cette dictee n'est pas encore disponible avec nos belles voix, ca arrive
        !
      </MyText>
      <VoiceToggle gender={voiceGender} onToggle={setVoiceGender} />
      <DictationPlayer isPlaying={isPlaying} play={play} pause={pause} />
    </View>
  );
};

export default TextToSpeech;
