import MyPressable from "@components/natives/MyPressable";
import { Eye, EyeOff } from "lucide-react-native";
import { forwardRef, useState } from "react";
import { TextInput, View } from "react-native";

type Variant = "default" | "light";

interface PasswordInputProps extends React.ComponentProps<typeof TextInput> {
  variant?: Variant;
}

const STYLES: Record<
  Variant,
  { container: string; placeholder: string; iconColor: string }
> = {
  default: {
    container: "bg-blue-50 border-blue-200",
    placeholder: "#9ca3af",
    iconColor: "#000",
  },
  light: {
    container: "bg-white border-white",
    placeholder: "#9ca3af",
    iconColor: "#93c5fd",
  },
};

const PasswordInput = forwardRef<TextInput, PasswordInputProps>(
  ({ variant = "default", ...props }, ref) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const Icon = isPasswordVisible ? Eye : EyeOff;
    const style = STYLES[variant];

    return (
      <View
        className={`flex-row items-center justify-between px-5 py-4 w-full border-2 rounded-2xl mb-4 ${style.container}`}
        style={props.style}
      >
        <TextInput
          ref={ref}
          autoCapitalize="none"
          className="h-6 flex-1 mr-2"
          placeholder="********"
          placeholderTextColor={style.placeholder}
          secureTextEntry={!isPasswordVisible}
          {...props}
        />

        <MyPressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
          <Icon size={20} color={style.iconColor} />
        </MyPressable>
      </View>
    );
  },
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;
