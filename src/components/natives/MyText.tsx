import { ComponentProps, ReactNode } from "react";
import { Text } from "react-native";
import { twMerge } from "tailwind-merge";

interface MyTextProps extends ComponentProps<typeof Text> {
  children: ReactNode;
}

const MyText = (props: MyTextProps) => {
  const { children, className, ...rest } = props;

  return (
    <Text className={twMerge("font-sans text-base", className)} {...rest}>
      {children}
    </Text>
  );
};

export default MyText;
