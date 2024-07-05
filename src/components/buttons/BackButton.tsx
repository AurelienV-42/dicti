import { dark, white } from "@config/colors";
import { useNavigation } from "@react-navigation/native";
import { ArrowLeft } from "phosphor-react-native";
import React from "react";
import MyPressable from "../natives/MyPressable";

interface BackButtonProps {
  padding?: boolean;
  theme?: "dark" | "white";
}

const BackButton = ({ padding = true, theme = "dark" }: BackButtonProps) => {
  const navigation = useNavigation();

  return (
    <MyPressable onPress={navigation.goBack} className={`${padding && "p-2"}`}>
      <ArrowLeft color={theme === "dark" ? dark : white} />
    </MyPressable>
  );
};

export default BackButton;
