import React, { ReactNode, memo } from "react";
import { PixelRatio, Text } from "react-native";

export type weightType = "medium" | "semiBold" | "bold";
export type fontSizeType = "3xl" | "2xl" | "xl" | "l" | "body" | "sm";

const fontSizes = {
  "3xl": [48, 56],
  "2xl": [32, 40],
  xl: [24, 32],
  l: [20, 24],
  body: [16, 20],
  sm: [12, 16],
};

interface MyTextProps {
  children: ReactNode;
  style?: string;
}

const fontFamilies = {
  medium: "JakartaMedium",
  semiBold: "JakartaSemiBold",
  bold: "JakartaBold",
};

const fontScale = PixelRatio.getFontScale();
const getFontSize = (size: fontSizeType) => fontSizes[size][0] / fontScale;

const catchFontSize = (style?: string): fontSizeType => {
  if (!style) return "body";

  const regex = /text-(3xl|2xl|xl|l|body|sm)/;
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
        lineHeight: fontSizes[catchFontSize(style)][1],
        fontFamily: fontFamilies[catchFontWeight(style)],
      }}
    >
      {children}
    </Text>
  );
}

export default memo(MyText);
