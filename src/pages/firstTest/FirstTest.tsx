import DisplayCorrection from "@src/components/DisplayCorrection";
import MyTextInput from "@src/components/inputs/MyTextInput";
import MyButton from "@src/components/natives/MyButton";
import SoundPlayer from "@src/components/soundPlayer/SoundPlayer";
import HeaderTemplate from "@src/components/templates/HeaderTemplate";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import { useDictation } from "@src/context/DictationContext";
import React from "react";
import { View } from "react-native";

const FirstTest = () => {
  const { state, dictationText, setDictationText, verify, restartDictation } =
    useDictation();

  return (
    <ScreenTemplate>
      <HeaderTemplate canGoBack />
      <View className="flex-1 justify-center">
        <SoundPlayer />
      </View>
      <View className="flex-[2] justify-center w-full">
        {state === "working" ? (
          <MyTextInput
            value={dictationText}
            onChangeText={setDictationText}
            placeholder={"Entre ta réponse"}
            onSubmitEditing={verify}
          />
        ) : (
          <DisplayCorrection />
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
          disabled={dictationText === "" || dictationText.length < 20}
          txt={state === "working" ? "Valider" : "Suivant"}
          onPress={verify}
        />
      </View>
    </ScreenTemplate>
  );
};

export default FirstTest;
