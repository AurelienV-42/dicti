import { useNavigation } from "@react-navigation/native";
import React from "react";
import MyPressable from "../natives/MyPressable";
import { ArrowLeft } from "phosphor-react-native";

const BackButton = ({ padding = true }: { padding?: boolean }) => {
  const navigation = useNavigation();

  return (
    <MyPressable onPress={navigation.goBack} className={`${padding && "p-2"}`}>
      <ArrowLeft />
    </MyPressable>
  );
};

export default BackButton;
