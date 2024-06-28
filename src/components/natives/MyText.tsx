import React, { ReactNode, memo } from "react";
import { PixelRatio, Text } from "react-native";

export type weightType = "medium" | "semiBold" | "bold";
export type fontSizeType = "h1" | "h2" | "body";

const fontSizes = {
  h1: 48,
  h2: 32,
  body: 16,
};

interface MyTextProps {
  children: ReactNode;
  style?: string;
  weight?: weightType;
  size?: fontSizeType;
}

const fontFamilies = {
  medium: "JakartaMedium",
  semiBold: "JakartaSemiBold",
  bold: "JakartaBold",
};

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: fontSizeType) => fontSizes[size] / fontScale;

const catchFontSize = (style?: string): fontSizeType => {
  if (!style) return "body";

  const regex = /text-(h1|h2|body)/;
  const match = style.match(regex);

  return match ? (match[1] as fontSizeType) : "body";
};

const catchFontWeight = (style?: string): weightType => {
  if (!style) return "medium";

  const regex = /text-(semiBold|bold)/;
  const match = style.match(regex);

  return match ? (match[1] as weightType) : "medium";
};

function MyText({ children, style }: MyTextProps): React.ReactElement {
  return (
    <Text
      className={`${style}`}
      style={{
        fontSize: getFontSize(catchFontSize(style)),
        fontFamily: fontFamilies[catchFontWeight(style)],
      }}
    >
      {children}
    </Text>
  );
}

export default memo(MyText);
