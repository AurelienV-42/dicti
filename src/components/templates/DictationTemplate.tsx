import { useNavigation } from "@react-navigation/native";
import DisplayCorrection from "@src/components/DisplayCorrection";
import MyTextInput from "@src/components/inputs/MyTextInput";
import MyButton from "@src/components/natives/MyButton";
import SoundPlayer from "@src/components/soundPlayer/SoundPlayer";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import useTextDictation from "@src/hooks/dictation/useTextDictation";
import { hapticImpact } from "@src/utils/haptics";
import resetTo from "@src/utils/resetTo";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import BasicModal from "../modals/BasicModal";
import TextToSpeech from "../soundPlayer/TextToSpeech";

interface DictationTemplateProps {
  dictationID: string;
  title: string;
  content: string;
  mp3File: any;
}

const DictationTemplate = ({
  dictationID,
  title,
  content,
  mp3File,
}: DictationTemplateProps) => {
  const navigation = useNavigation();
  const {
    state,
    userText,
    correction,
    note,
    setUserText,
    verify,
    restartDictation,
  } = useTextDictation(dictationID, content);
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
    <ScreenTemplate
      backgroundColor="bg-blue-300"
      edges={["top", "bottom"]}
      padding
    >
      <HeaderTemplate canGoBack title={title} theme={"white"} />
      <View className="mb-10 justify-center">
        {mp3File ? (
          <SoundPlayer mp3File={mp3File} shouldStop={shouldStop} />
        ) : (
          <TextToSpeech content={content} shouldStop={shouldStop} />
        )}
      </View>

      <View className="flex-1 bg-white w-full rounded-3xl rounded-tl-none p-4 shadow-md">
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
        <View className="w-full">
          {__DEV__ && state !== "working" && (
            <MyButton
              className="mb-2 w-full"
              type="secondary"
              txt={"Recommencer la dictée"}
              onPress={restartDictation}
            />
          )}
          <MyButton
            className="w-full"
            disabled={userText === "" || userText.length < 20}
            txt={state === "working" ? "Valider" : "Suivant"}
            onPress={onPress}
          />
        </View>
      </View>
      <BasicModal
        visible={!!note}
        title={`Tu as ${note}/20 !`}
        description={"Est-ce qu'on continue pour améliorer ta note ?"}
        txtButtonRight={"Oui !"}
        onPressRight={() => {
          hapticImpact("heavy");
          resetTo(navigation, "Loader");
        }}
      />
    </ScreenTemplate>
  );
};

export default DictationTemplate;
