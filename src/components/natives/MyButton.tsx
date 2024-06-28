import MyText from "@src/components/natives/MyText";
import React from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";

interface MyButtonProps {
  style?: string;
  onPress?: () => void;
  txt?: string;
  txtStyle?: string;
  secondary?: boolean;
  disabled?: boolean;
  fullWidth?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  type?: "default" | "secondary";
}

const MyButton = ({
  style,
  onPress,
  txt = "",
  txtStyle,
  type = "default",
  disabled = false,
  fullWidth = false,
  leftIcon,
  rightIcon,
  isLoading = false,
}: MyButtonProps): React.ReactElement => {
  const template: Record<
    string,
    {
      container: string;
      text: string;
      shadow?: boolean;
    }
  > = {
    default: {
      container: "bg-orange",
      text: "text-light-200 text-semiBold",
    },
    secondary: {
      container: "border-2 border-orange",
      text: "text-semiBold text-orange",
    },
  };

  return (
    <TouchableOpacity
      className={`flex-row py-3 items-center justify-center px-5 rounded-full self-start 
      ${template[type].container} ${fullWidth && "w-full"}  ${
        rightIcon && !isLoading && "justify-between"
      } ${disabled && "opacity-50"} ${style}`}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {leftIcon && !isLoading && leftIcon}
      {txt && !isLoading && (
        <MyText style={`${template[type].text} ${txtStyle}`}>{txt}</MyText>
      )}
      {isLoading && (
        <View>
          <ActivityIndicator
            size={"small"}
            color={type === "secondary" ? "white" : "black"}
          />
        </View>
      )}
      {rightIcon && !isLoading && rightIcon}
    </TouchableOpacity>
  );
};

export default MyButton;
