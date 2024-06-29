import assets from "@assets/index";
import { ID_FIRST_TEST } from "@config/dictations";
import MyImage from "@src/components/natives/MyImage";
import { getAsyncStorage } from "@src/utils/asyncStorage";
import resetTo from "@src/utils/resetTo";
import React, { useEffect } from "react";
import { View } from "react-native";

interface LoaderScreenProps {
  navigation: any;
}

const LoaderScreen = ({ navigation }: LoaderScreenProps) => {
  useEffect(() => {
    getAsyncStorage(ID_FIRST_TEST).then((value) => {
      resetTo(navigation, value ? "Home" : "Introduction");
    });
  }, [navigation]);

  return (
    <View className="justify-center items-center bg-light-200">
      <MyImage style="w-full" img={assets.splash} />
    </View>
  );
};

export default LoaderScreen;
