import { TextInput, View } from "react-native";

interface TextInputTemplateProps
  extends React.ComponentProps<typeof TextInput> {}

const TextInputTemplate = (props: TextInputTemplateProps) => {
  return (
    <View
      className={`justify-center px-4 py-2 w-full bg-light-100 shadow-lg rounded-full mb-4`}
      style={props.style}
    >
      <TextInput className="h-8" autoCapitalize="none" {...props} />
    </View>
  );
};

export default TextInputTemplate;
