import { useDictation } from "@src/context/DictationContext";
import { useState } from "react";
import { View } from "react-native";
import ModalToDisplayErrors from "./modals/ModalToDisplayErrors";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";

const DisplayCorrection = () => {
  const { correctedText } = useDictation();
  const [indexModalVisible, setIndexModalVisible] = useState(-1);

  return (
    <View className="bg-light-100 px-4 pt-4 pb-2 w-full rounded-lg shadow-md">
      <MyText style="text-base text-blue">
        {correctedText.map((correctedWord, index: number) => {
          const isError =
            !!correctedWord.errors && correctedWord.errors.length > 0;

          return (
            <View key={index}>
              {indexModalVisible === index &&
                !!correctedWord.errors &&
                correctedWord.errors.length > 0 && (
                  <ModalToDisplayErrors
                    errors={correctedWord.errors}
                    close={() => setIndexModalVisible(-1)}
                  />
                )}
              <MyPressable
                className={`z-0 px-2 py-1 bg-green rounded-full mr-2 mb-2 ${isError && "bg-red"}`}
                onPress={() => {
                  setIndexModalVisible(index);
                }}
                disabled
                // disabled={!isError}
              >
                <MyText style={`text-dark`}>{correctedWord.text}</MyText>
              </MyPressable>
            </View>
          );
        })}
      </MyText>
    </View>
  );
};

export default DisplayCorrection;
