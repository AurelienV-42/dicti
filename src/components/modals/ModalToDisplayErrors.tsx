import { ArrowRight } from "phosphor-react-native";
import { ActivityIndicator, View } from "react-native";
import DisplayLifes from "../gamification/DisplayLifes";
import MyButton from "../natives/MyButton";
import MyText from "../natives/MyText";
import ModalTemplate from "../templates/ModalTemplate";

const Title = ({
  goodWord,
  badWord,
}: {
  goodWord: string;
  badWord: string;
}) => (
  <View className="flex-row items-center justify-center mb-2">
    {badWord.length > 0 && (
      <MyText className="text-2xl text-red-300 line-through mr-2">
        {badWord}
      </MyText>
    )}
    {badWord.length > 0 && (
      <View className="mr-2">
        <ArrowRight size={20} />
      </View>
    )}
    <MyText className="text-2xl text-green-300">{goodWord}</MyText>
  </View>
);

const LoadingFromAI = () => (
  <View className="flex-row items-center justify-center my-2">
    <ActivityIndicator className="mr-1" />
    <MyText>Correction avec l'IA...</MyText>
  </View>
);

const ModalToDisplayErrors = ({
  goodWord,
  badWord,
  errors,
  isLoading,
  close,
}: {
  goodWord: string;
  badWord: string;
  errors?: string[];
  isLoading: boolean;
  close: () => void;
}) => {
  const moreThanOne = errors && errors.length > 1;

  return (
    <ModalTemplate visible close={close}>
      <DisplayLifes variant="small" />
      <Title badWord={badWord} goodWord={goodWord} />
      <View className="mb-4">
        {isLoading && <LoadingFromAI />}
        {!isLoading &&
          errors &&
          errors.map((error, index) => (
            <MyText
              key={index}
            >{`${moreThanOne ? `${index + 1}.\t ` : ""}${error}`}</MyText>
          ))}
      </View>
      <MyButton className="w-full" onPress={close} txt={"Fermer"} />
    </ModalTemplate>
  );
};

export default ModalToDisplayErrors;
