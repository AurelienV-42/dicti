import { TextInput } from "react-native";

interface TextInputTemplateProps
  extends React.ComponentProps<typeof TextInput> {}

const TextInputTemplate = (props: TextInputTemplateProps) => {
  return <TextInput autoCapitalize="none" {...props} />;
};

export default TextInputTemplate;
