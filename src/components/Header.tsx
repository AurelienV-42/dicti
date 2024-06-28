import shadow from "@config/shadow";
import React from "react";
import { View } from "react-native";
import MyText from "./natives/MyText";

interface HeaderProps {}

const Header = ({}: HeaderProps) => {
  return (
    <View
      className={"items-center w-full py-6 bg-white -top-10 pt-16"}
      style={shadow.medium}
    >
      <MyText>Dicti</MyText>
    </View>
  );
};

export default Header;
