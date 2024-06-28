import React from "react";
import { SafeAreaView } from "react-native";

interface TemplateScreenProps {
  children: React.ReactNode;
}
const TemplateScreen = ({ children }: TemplateScreenProps) => {
  return <SafeAreaView className={`flex-1`}>{children}</SafeAreaView>;
};

export default TemplateScreen;
