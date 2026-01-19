import { useLifes } from "@stores/lifes.store";
import useErrorsFromAI from "@hooks/useErrorsFromAI";
import { CorrectionItem } from "@utils/dictationString";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Alert, Platform, ScrollView, View } from "react-native";
import ModalToDisplayErrors from "@components/modals/ModalToDisplayErrors";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";

const DisplayCorrection = ({
  correction,
  correctText,
}: {
  correction: CorrectionItem[];
  correctText: string;
}): React.ReactElement => {
  const router = useRouter();
  const [indexModalVisible, setIndexModalVisible] = useState(-1);
  const { errorsFromAI, isLoading } = useErrorsFromAI(
    correction,
    correctText,
    indexModalVisible,
  );
  const { decrementLife } = useLifes();

  const showCorrection = (index: number): void => {
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
            onPress: () => router.push("/subscription-modal"),
          },
        ],
      );
    });
  };

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
            <View className="self-start" key={`${item.correctWord}-${index}`}>
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
                accessibilityLabel={
                  isError
                    ? `${item.correctWord}, erreur, appuyez pour voir la correction`
                    : item.correctWord
                }
                className={`z-0 rounded-full mr-1 mb-2 ${Platform.OS === "ios" && isError && "px-2 py-0.5 bg-red-200"}`}
                onPress={() => showCorrection(index)}
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
    </ScrollView>
  );
};

export default DisplayCorrection;
