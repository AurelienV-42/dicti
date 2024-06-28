import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { Platform, SafeAreaView, View } from "react-native";

interface ScreenTemplateProps {
  children: ReactNode;
  transparent?: boolean;
  className?: string;
  style?: any;
  padding?: boolean;
}

const ScreenTemplate = ({
  children,
  transparent = false,
  style,
  padding = true,
}: ScreenTemplateProps) => (
  <SafeAreaView
    className={`flex-1 ${!transparent && "bg-light-200"} ${Platform.OS !== "ios" && "pt-10 pb-4"}`}
  >
    <StatusBar style="dark" />
    <View
      className={`flex-1 items-center justify-between ${padding && "px-4"}`}
      style={style}
    >
      {children}
    </View>
  </SafeAreaView>
);

export default ScreenTemplate;
