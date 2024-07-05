import { Eye, EyeClosed } from "phosphor-react-native";
import { useState } from "react";
import { TextInput, View } from "react-native";
import MyPressable from "../natives/MyPressable";

interface TextInputTemplateProps
  extends React.ComponentProps<typeof TextInput> {}

const PasswordInput = (props: TextInputTemplateProps) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const Icon = isPasswordVisible ? Eye : EyeClosed;

  return (
    <View
      className={`flex-row items-center justify-between px-4 py-2 w-full bg-white shadow-lg rounded-2xl mb-4`}
      style={props.style}
    >
      <TextInput
        autoCapitalize="none"
        className="h-8 flex-1 mr-2"
        placeholder="********"
        secureTextEntry={!isPasswordVisible}
        {...props}
      />

      <MyPressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
        <Icon size={20} />
      </MyPressable>
    </View>
  );
};

export default PasswordInput;
