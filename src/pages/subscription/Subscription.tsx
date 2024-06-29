import assets from "@assets/index";
import { orange } from "@config/colors";
import { useNavigation } from "@react-navigation/native";
import MyButton from "@src/components/natives/MyButton";
import MyImage from "@src/components/natives/MyImage";
import MyText from "@src/components/natives/MyText";
import DisplayProducts from "@src/components/purchase/DisplayProducts";
import ScreenTemplate from "@src/components/templates/ScreenTemplate";
import useAnalytics from "@src/hooks/useAnalytics";
import { setAsyncStorage } from "@src/utils/asyncStorage";
import { hapticImpact } from "@src/utils/haptics";
import resetTo from "@src/utils/resetTo";
import { Brain, LockOpen } from "phosphor-react-native";
import React, { useState } from "react";
import { View } from "react-native";

const Advantages = () => {
  const advantages = [
    {
      title: "Accès en illimité",
      Icon: LockOpen,
    },
    {
      title: "Explication des erreurs",
      Icon: Brain,
    },
  ];
  return (
    <View>
      {advantages.map((advantage, index) => (
        <View className="flex-row items-center mb-3" key={index}>
          <View className="mr-2">
            <advantage.Icon size={32} color={orange} />
          </View>
          <MyText style="text-xl ">{advantage.title}</MyText>
        </View>
      ))}
    </View>
  );
};

const Subscription = () => {
  const navigation = useNavigation();
  const [selectedNbMonth, setSelectedNbMonth] = useState(12);
  const { capture } = useAnalytics();

  const subscribe = () => {
    hapticImpact("heavy");
    capture("Subscription", { property: selectedNbMonth });

    const unsubscribedDate = new Date();
    unsubscribedDate.setMonth(unsubscribedDate.getMonth() + selectedNbMonth);
    setAsyncStorage("unsubscribedDate", unsubscribedDate.toISOString());
    resetTo(navigation, "Home");
  };

  return (
    <ScreenTemplate>
      <MyImage style="w-60 h-60" containerStyle="w-60 h-60" img={assets.icon} />

      <MyText style="text-xl text-center w-[95%]">
        Les abonnés Dicti ont
        <MyText style="text-xl text-orange text-bold"> 2.8 fois </MyText>
        plus de chances d'améliorer leur niveau en orthographe
      </MyText>

      <Advantages />

      <View className="w-full">
        <DisplayProducts
          products={[
            {
              nbMonth: 1,
              priceByMonth: "5.99€",
              priceTotal: "5.99€",
            },
            {
              nbMonth: 12,
              priceByMonth: "4.99€",
              priceTotal: "59.99€",
            },
          ]}
          selectedNbMonth={selectedNbMonth}
          setSelectedNbMonth={setSelectedNbMonth}
        />
        <MyButton txt="S'abonner" onPress={subscribe} />
      </View>
    </ScreenTemplate>
  );
};

export default Subscription;
