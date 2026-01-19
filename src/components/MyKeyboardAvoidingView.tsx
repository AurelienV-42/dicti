import { ComponentProps, ReactNode } from "react";
import {
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  View,
} from "react-native";

interface MyKeyboardAvoidingViewProps extends ComponentProps<
  typeof KeyboardAvoidingView
> {
  children: ReactNode;
}

const MyKeyboardAvoidingView = (props: MyKeyboardAvoidingViewProps) => {
  const { children } = props;
  const keyboardVerticalOffset = Platform.OS === "ios" ? 0 : 0;

  return (
    <KeyboardAvoidingView
    className="flex-1 bg-white"
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={keyboardVerticalOffset}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className={props.className}>
          {children}
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default MyKeyboardAvoidingView;
