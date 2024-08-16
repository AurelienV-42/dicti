import { useLifes } from "@src/context/Lifes";
import useErrorsFromAI from "@src/hooks/useErrorsFromAI";
import { CorrectionItem } from "@src/utils/dictationString";
import React, { useState } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import ModalToDisplayErrors from "./modals/ModalToDisplayErrors";
import SubscriptionModal from "./modals/SubscriptionModal";
import MyPressable from "./natives/MyPressable";
import MyText from "./natives/MyText";

const DisplayCorrection = ({
  correction,
  correctText,
}: {
  correction: CorrectionItem[];
  correctText: string;
}) => {
  const [isSubscriptionVisible, setIsSubscriptionVisible] = useState(false);
  const [indexModalVisible, setIndexModalVisible] = useState(-1);
  const { errorsFromAI, isLoading } = useErrorsFromAI(
    correction,
    correctText,
    indexModalVisible,
  );
  const { decrementLife } = useLifes();

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingTop: 12, paddingBottom: 20 }}
      className="pt-1 mb-4"
    >
      <MyText>
        {correction.map((item, index: number) => {
          const isError = !!item.errors;

          return (
            <View className="self-start" key={index}>
              {indexModalVisible === index && (
                <ModalToDisplayErrors
                  goodWord={item.correctWord}
                  badWord={item.userWord}
                  errors={errorsFromAI ?? item.errors}
                  isLoading={isLoading}
                  close={() => setIndexModalVisible(-1)}
                />
              )}
              <MyPressable
                className={`z-0 rounded-full mr-1 mb-2 ${Platform.OS === "ios" && isError && "px-2 py-0.5 bg-red-200"}`}
                onPress={() => {
                  decrementLife().then((isSuccess: boolean) => {
                    if (isSuccess) {
                      setIndexModalVisible(index);
                      return;
                    }
                    Alert.alert(
                      "Vous n'avez plus de vies 😕",
                      "Pour avoir des vies en illimité, abonnez-vous !",
                      [
                        {
                          text: "Plus tard",
                          style: "cancel",
                        },
                        {
                          text: "S'abonner",
                          onPress: () => setIsSubscriptionVisible(true),
                        },
                      ],
                    );
                  });
                }}
                disabled={!isError}
              >
                <MyText className={`text-dark ${isError && "text-red-300"}`}>
                  {item.correctWord}
                </MyText>
              </MyPressable>
            </View>
          );
        })}
      </MyText>
      <SubscriptionModal
        isVisible={isSubscriptionVisible}
        close={() => setIsSubscriptionVisible(false)}
      />
    </ScrollView>
  );
};

export default DisplayCorrection;
