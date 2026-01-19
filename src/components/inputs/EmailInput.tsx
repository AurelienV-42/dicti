import { MAX_LENGTH_EMAIL } from "@config/inputs";
import { TextInput, View } from "react-native";

type Variant = "default" | "light";

interface EmailInputProps extends React.ComponentProps<typeof TextInput> {
  variant?: Variant;
}

const STYLES: Record<Variant, { container: string; placeholder: string }> = {
  default: {
    container: "bg-blue-50 border-blue-200",
    placeholder: "#9ca3af",
  },
  light: {
    container: "bg-white border-white",
    placeholder: "#9ca3af",
  },
};

const EmailInput = ({ variant = "default", ...props }: EmailInputProps) => {
  const style = STYLES[variant];

  return (
    <View
      className={`justify-center px-5 py-4 w-full border-2 rounded-2xl mb-4 ${style.container}`}
      style={props.style}
    >
      <TextInput
        autoCapitalize="none"
        className="h-6"
        placeholder="john@doe.com"
        placeholderTextColor={style.placeholder}
        maxLength={MAX_LENGTH_EMAIL}
        {...props}
      />
    </View>
  );
};

export default EmailInput;
