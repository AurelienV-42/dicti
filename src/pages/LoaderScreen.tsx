import assets from "@assets/index";
import AsyncStorage from "@react-native-async-storage/async-storage";
import MyImage from "@src/components/natives/MyImage";
import resetTo from "@src/utils/resetTo";
import React, { useEffect } from "react";
import { View } from "react-native";

interface LoaderScreenProps {
  navigation: any;
}

const LoaderScreen = ({ navigation }: LoaderScreenProps) => {
  useEffect(() => {
    AsyncStorage.getItem("hasDoneFirstTest").then((value) =>
      resetTo(navigation, value === "true" ? "Home" : "Introduction"),
    );
  }, [navigation]);

  return (
    <View className="justify-center items-center bg-light-200">
      <MyImage style="w-full" img={assets.splash} />
    </View>
  );
};

export default LoaderScreen;
