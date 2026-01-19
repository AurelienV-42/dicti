import { useNavigation } from "@react-navigation/native";
import DisplayCorrection from "@components/DisplayCorrection";
import MyTextInput from "@components/inputs/MyTextInput";
import MyButton from "@components/natives/MyButton";
import SoundPlayer from "@components/soundPlayer/SoundPlayer";
import HeaderTemplate from "@components/templates/HeaderTemplate";
import ScreenTemplate from "@components/templates/ScreenTemplate";
import useTextDictation from "@hooks/dictation/useTextDictation";
import useTracking from "@hooks/useTracking";
import { hapticImpact } from "@utils/haptics";
import React, { useEffect, useState } from "react";
import { KeyboardAvoidingView, Platform, View } from "react-native";
import BasicModal from "@components/modals/BasicModal";
import MyText from "@components/natives/MyText";
import TextToSpeech from "@components/soundPlayer/TextToSpeech";

type AssetSource = ReturnType<typeof require>;

interface DictationTemplateProps {
  dictationID: string;
  title?: string;
  content?: string;
  mp3File: AssetSource | null;
  onComplete?: () => void;
}

const DictationTemplate = ({
  dictationID,
  title,
  content,
  mp3File,
  onComplete,
}: DictationTemplateProps) => {
  useTracking();
  const navigation = useNavigation();
  const [isResultVisible, setIsResultVisible] = useState(false);
  const {
    state,
    userText,
    correction,
    grade,
    setUserText,
    verify,
    restartDictation,
  } = useTextDictation(dictationID, setIsResultVisible, content);
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
      className="pb-4"
    >
      <HeaderTemplate canGoBack title={title} theme={"white"} />
      {!content && (
        <MyText className="text-white">
          Nous n'avons pas retrouvé cette dictée 😰
        </MyText>
      )}
      {content && (
        <>
          <View className="mb-10 justify-center">
            {mp3File ? (
              <SoundPlayer mp3File={mp3File} shouldStop={shouldStop} />
            ) : (
              <TextToSpeech content={content} shouldStop={shouldStop} />
            )}
          </View>

          <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={60}
            className="flex-1 bg-white w-full rounded-3xl rounded-tl-none p-4 shadow-md"
          >
            {state === "working" ? (
              <MyTextInput
                value={userText}
                onChangeText={setUserText}
                placeholder={"Entre ta réponse"}
                onSubmitEditing={verify}
              />
            ) : (
              <DisplayCorrection
                correction={correction}
                correctText={content}
              />
            )}
            <View className="w-full pb-4">
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
          </KeyboardAvoidingView>
        </>
      )}
      <BasicModal
        visible={isResultVisible}
        title={`Tu as ${grade}/20 !`}
        description={"Est-ce qu'on continue pour améliorer ta note ?"}
        txtButtonRight={"Oui !"}
        onPressRight={() => {
          hapticImpact("heavy");
          setIsResultVisible(false);
          if (onComplete) {
            onComplete();
            return;
          }
          navigation.navigate("Loader");
        }}
      />
    </ScreenTemplate>
  );
};

export default DictationTemplate;
