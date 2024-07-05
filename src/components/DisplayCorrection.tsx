import { CorrectionItem } from "@src/utils/dictationString";
import { useState } from "react";
import { ScrollView, View } from "react-native";
import ModalToDisplayErrors from "./modals/ModalToDisplayErrors";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";

const DisplayCorrection = ({
  correction,
}: {
  correction: CorrectionItem[];
}) => {
  const [indexModalVisible, setIndexModalVisible] = useState(-1);

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      className="pt-1 rounded-lg shadow-lg bg-white mb-4"
    >
      <MyText>
        {correction.map((correctedWord, index: number) => {
          const isError =
            !!correctedWord.errors && correctedWord.errors.length > 0;

          return (
            <View className="self-start" key={index}>
              {indexModalVisible === index &&
                !!correctedWord.errors &&
                correctedWord.errors.length > 0 && (
                  <ModalToDisplayErrors
                    errors={correctedWord.errors}
                    close={() => setIndexModalVisible(-1)}
                  />
                )}
              <MyPressable
                className={`z-0 rounded-full mr-1 mb-2 ${isError && "px-2 py-0.5 bg-red-200"}`}
                onPress={() => {
                  setIndexModalVisible(index);
                }}
                disabled
                // disabled={!isError}
              >
                <MyText className={`text-dark`}>{correctedWord.text}</MyText>
              </MyPressable>
            </View>
          );
        })}
      </MyText>
    </ScrollView>
  );
};

export default DisplayCorrection;
