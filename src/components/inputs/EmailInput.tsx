import { MAX_LENGTH_EMAIL } from "@config/inputs";
import { TextInput, View } from "react-native";

interface TextInputTemplateProps
  extends React.ComponentProps<typeof TextInput> {}

const EmailInput = (props: TextInputTemplateProps) => {
  return (
    <View
      className={`justify-center px-4 py-2 w-full bg-white shadow-lg rounded-2xl mb-4`}
      style={props.style}
    >
      <TextInput
        autoCapitalize="none"
        className="h-8"
        placeholder="john@doe.com"
        maxLength={MAX_LENGTH_EMAIL}
        {...props}
      />
    </View>
  );
};

export default EmailInput;
