import MyText from "@src/components/natives/MyText";
import resetTo from "@src/utils/resetTo";
import React, { useEffect } from "react";
import { View } from "react-native";

interface LoaderScreenProps {
  navigation: any;
}

const LoaderScreen = ({ navigation }: LoaderScreenProps) => {
  useEffect(() => {
    resetTo(navigation, "Home");
  }, [navigation]);

  return (
    <View className={"flex-1 items-center justify-center"}>
      <MyText>Chargement...</MyText>
    </View>
  );
};

export default LoaderScreen;
