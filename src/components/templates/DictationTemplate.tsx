import DisplayCorrection from "@src/components/DisplayCorrection";
import MyTextInput from "@src/components/inputs/MyTextInput";
import MyButton from "@src/components/natives/MyButton";
import SoundPlayer from "@src/components/soundPlayer/SoundPlayer";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import useTextDictation from "@src/hooks/dictation/useTextDictation";
import { hapticImpact } from "@src/utils/haptics";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import TextToSpeech from "../soundPlayer/TextToSpeech";

interface DictationTemplateProps {
  dictationId: string;
  title: string;
  content: string;
  mp3File: any;
}

const DictationTemplate = ({
  dictationId,
  title,
  content,
  mp3File,
}: DictationTemplateProps) => {
  const { state, userText, correction, setUserText, verify, restartDictation } =
    useTextDictation(dictationId, content);
  const [shouldStop, setShouldStop] = useState(false);

  const onPress = () => {
    hapticImpact("heavy");
    verify();
    setShouldStop(true);
  };

  useEffect(() => {
    if (state === "working") setShouldStop(false);
  }, [state]);

  return (
    <ScreenTemplate>
      <HeaderTemplate canGoBack title={title} />
      <View className="flex-1 justify-center">
        {mp3File ? (
          <SoundPlayer mp3File={mp3File} shouldStop={shouldStop} />
        ) : (
          <TextToSpeech content={content} shouldStop={shouldStop} />
        )}
      </View>

      <View className="flex-[2] justify-center w-full">
        {state === "working" ? (
          <MyTextInput
            value={userText}
            onChangeText={setUserText}
            placeholder={"Entre ta réponse"}
            onSubmitEditing={verify}
          />
        ) : (
          <DisplayCorrection correction={correction} />
        )}
      </View>

      <View className="w-full">
        {__DEV__ && state !== "working" && (
          <MyButton
            className="mb-2"
            type="secondary"
            txt={"Recommencer la dictée"}
            onPress={restartDictation}
          />
        )}
        <MyButton
          disabled={userText === "" || userText.length < 20}
          txt={state === "working" ? "Valider" : "Suivant"}
          onPress={onPress}
        />
      </View>
    </ScreenTemplate>
  );
};

export default DictationTemplate;
