import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { Platform, View } from "react-native";
import { Edges, SafeAreaView } from "react-native-safe-area-context";

interface ScreenTemplateProps {
  children: ReactNode;
  backgroundColor?: string;
  edges?: Edges;
  className?: string;
  style?: any;
  padding?: boolean;
}

const ScreenTemplate = ({
  children,
  backgroundColor = "bg-blue-100",
  edges = ["top"],
  style,
  padding = false,
}: ScreenTemplateProps) => (
  <SafeAreaView
    edges={edges}
    className={`flex-1 ${backgroundColor} ${Platform.OS !== "ios" && "pt-10 pb-4"}`}
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
