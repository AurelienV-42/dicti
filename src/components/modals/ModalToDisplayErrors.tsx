import { ArrowRight } from "phosphor-react-native";
import { View } from "react-native";
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
    <MyText className="text-2xl text-red-300 line-through mr-2">
      {badWord}
    </MyText>
    <ArrowRight size={20} />
    <MyText className="text-2xl text-green-300 ml-2">{goodWord}</MyText>
  </View>
);

const LoadingFromAI = () => (
  <View className="flex-row items-center justify-center">
    <MyText>Chargement de l'IA</MyText>
  </View>
);

const ModalToDisplayErrors = ({
  errors,
  close,
}: {
  errors?: string[];
  close: () => void;
}) => {
  const moreThanOne = errors && errors.length > 1;

  return (
    <ModalTemplate visible close={close}>
      <Title goodWord="Bonjour" badWord="Bojour" />
      <View className="mb-4">
        {errors ? (
          errors.map((error, index) => (
            <MyText
              key={index}
            >{`${moreThanOne ? `${index + 1}.\t ` : ""}${error}`}</MyText>
          ))
        ) : (
          <LoadingFromAI />
        )}
      </View>
      <MyButton className="w-full" onPress={close} txt={"Fermer"} />
    </ModalTemplate>
  );
};

export default ModalToDisplayErrors;
