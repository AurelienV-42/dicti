import { ComponentProps, ReactNode } from "react";
import { Text } from "react-native";

interface MyTextProps extends ComponentProps<typeof Text> {
  children: ReactNode;
}

const MyText = (props: MyTextProps) => {
  const { style, children } = props;

  return (
    <Text {...props} className="text-base" style={style}>
      {children}
    </Text>
  );
};

export default MyText;
