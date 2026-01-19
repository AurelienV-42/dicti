import MyText from "@components/natives/MyText";
import React from "react";
import { ActivityIndicator, View } from "react-native";
import MyPressable from "@components/natives/MyPressable";
import { twMerge } from "tailwind-merge";

interface MyButtonProps {
  onPress?: () => void;
  txt?: string;
  txtStyle?: string;
  secondary?: boolean;
  disabled?: boolean;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  isLoading?: boolean;
  type?: "default" | "secondary" | "light";
  className?: string;
}

const MyButton = ({
  onPress,
  txt = "",
  txtStyle,
  type = "default",
  disabled = false,
  leftIcon,
  rightIcon,
  isLoading = false,
  className,
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
      container: "border-2 border-blue-300 bg-blue-300",
      text: "text-white",
    },
    secondary: {
      container: "border-2 border-blue-300",
      text: "text-blue-300",
    },
    light: {
      container: "border-2 border-white bg-white",
      text: "text-blue-300",
    },
  };

  return (
    <MyPressable
      accessibilityLabel={txt}
      className={twMerge(
        "flex-row py-3.5 items-center justify-center px-5 rounded-2xl self-start",
        template[type].container,
        rightIcon && !isLoading && "justify-between",
        disabled && "opacity-50",
        className,
      )}
      onPress={onPress}
      disabled={disabled || isLoading}
    >
      {leftIcon && !isLoading && leftIcon}
      {txt && !isLoading && (
        <MyText
          className={twMerge(
            "text-lg font-semibold",
            template[type].text,
            txtStyle,
          )}
        >
          {txt}
        </MyText>
      )}
      {isLoading && (
        <View>
          <ActivityIndicator
            size={"small"}
            color={type === "secondary" ? "#93c5fd" : "white"}
          />
        </View>
      )}
      {rightIcon && !isLoading && rightIcon}
    </MyPressable>
  );
};

export default MyButton;
