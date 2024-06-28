import { TextInput } from "react-native";

interface TextInputTemplateProps
  extends React.ComponentProps<typeof TextInput> {}

const TextInputTemplate = (props: TextInputTemplateProps) => {
  return (
    <TextInput
      className="border-b-2 border-gray-300"
      autoCapitalize="none"
      {...props}
    />
  );
};

export default TextInputTemplate;
