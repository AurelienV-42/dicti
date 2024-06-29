import { View } from "react-native";
import TextInputTemplate from "../templates/TextInputTemplate";

interface MyTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  onSubmitEditing: () => void;
}
const MyTextInput = ({
  value,
  onChangeText,
  placeholder,
  onSubmitEditing,
}: MyTextInputProps) => {
  return (
    <View className="w-full bg-light-100 p-4 rounded-2xl shadow-md">
      <TextInputTemplate
        autoCapitalize="sentences"
        maxLength={2000}
        className="border-0"
        style={{
          height: 180,
          textAlignVertical: "top",
        }}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        multiline
        onSubmitEditing={onSubmitEditing}
        autoCorrect={false}
        spellCheck={false}
      />
    </View>
  );
};

export default MyTextInput;
