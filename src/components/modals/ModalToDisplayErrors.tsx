import { View } from "react-native";
import MyButton from "../natives/MyButton";
import MyText from "../natives/MyText";
import ModalTemplate from "../templates/ModalTemplate";

const ModalToDisplayErrors = ({
  errors,
  close,
}: {
  errors: string[];
  close: () => void;
}) => {
  const moreThanOne = errors.length > 1;
  return (
    <ModalTemplate visible close={close}>
      <View className="mb-4">
        {errors.map((error, index) => (
          <MyText
            key={index}
          >{`${moreThanOne ? `${index + 1}.\t ` : ""}${error}`}</MyText>
        ))}
      </View>
      <MyButton onPress={close} txt={"Fermer"} />
    </ModalTemplate>
  );
};

export default ModalToDisplayErrors;
