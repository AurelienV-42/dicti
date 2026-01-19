import LogoVectorized from "@assets/vectorized/LogoVectorized";
import { SubscriptionPackage } from "@appTypes/subscription";
import { orange } from "@config/colors";
import { useRouter } from "expo-router";
import Legals from "@components/Legals";
import MyButton from "@components/natives/MyButton";
import MyPressable from "@components/natives/MyPressable";
import MyText from "@components/natives/MyText";
import DisplayProducts from "@components/purchase/DisplayProducts";
import HeaderTemplate from "@components/templates/HeaderTemplate";
import ScreenTemplate from "@components/templates/ScreenTemplate";
import useAnalytics from "@hooks/useAnalytics";
import useGetSubscriptions from "@hooks/useGetSubscriptions";
import { hapticImpact } from "@utils/haptics";
import { pay } from "@utils/purchase";
import { useMutation } from "@tanstack/react-query";
import { Brain, LockOpen, X } from "lucide-react-native";
import { useState } from "react";
import { ActivityIndicator, ScrollView, View } from "react-native";

const Advantages = (): React.ReactElement => {
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
    <View className="mb-5">
      {advantages.map((advantage, index) => (
        <View className="flex-row items-center mb-3" key={index}>
          <View className="mr-2">
            <advantage.Icon size={32} color={orange[300]} />
          </View>
          <MyText className="text-xl ">{advantage.title}</MyText>
        </View>
      ))}
    </View>
  );
};

const SubscriptionModal = (): React.ReactElement => {
  const router = useRouter();
  const [selectedNbMonth, setSelectedNbMonth] = useState(12);
  const { capture } = useAnalytics();
  const { subscriptions, loading, error } = useGetSubscriptions();

  const close = (): void => {
    router.back();
  };

  const payMutation = useMutation({
    mutationFn: async (selectedSubscription: SubscriptionPackage) =>
      pay(selectedSubscription, () => router.replace("/(app)/home")),
  });

  const subscribe = (): void => {
    hapticImpact("heavy");
    capture("Subscription", { property: selectedNbMonth });

    if (!subscriptions) throw new Error("No subscriptions available");
    const selectedSubscription = subscriptions.find(
      (s) => s.nbMonths === selectedNbMonth,
    );
    if (!selectedSubscription) return;
    payMutation.mutate(selectedSubscription);
  };

  if (loading)
    return (
      <ScreenTemplate padding>
        <View className="flex-1 justify-center items-center">
          <ActivityIndicator
            className="mb-5"
            size="large"
            color={orange[300]}
          />
          <MyText>Chargement des abonnements...</MyText>
        </View>
      </ScreenTemplate>
    );

  if (error || !subscriptions || subscriptions.length === 0)
    return (
      <ScreenTemplate padding>
        <HeaderTemplate canGoBack />
        <View className="flex-1 justify-center items-center">
          <MyText className="mb-2 text-xl text-dark text-center">
            Une erreur est survenue lors du chargement des abonnements:
          </MyText>
          <MyText className="mt-2 text-center">{error}</MyText>
        </View>
      </ScreenTemplate>
    );

  return (
    <ScreenTemplate edges={["top", "bottom"]} padding={false}>
      <ScrollView
        className="w-full"
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 20,
          alignItems: "center",
        }}
      >
        <MyPressable className="absolute right-4" onPress={close}>
          <X />
        </MyPressable>
        <LogoVectorized className="mb-5" width={200} height={200} />

        <MyText className="text-xl text-center w-[95%] mb-5">
          Les abonnés Dicti ont
          <MyText className="text-xl text-orange font-bold"> 2.8 fois </MyText>
          plus de chances d'améliorer leur niveau en orthographe
        </MyText>

        <Advantages />

        <View className="w-full">
          <DisplayProducts
            products={subscriptions}
            selectedNbMonth={selectedNbMonth}
            setSelectedNbMonth={setSelectedNbMonth}
          />
          <MyButton
            className={"w-full mb-5"}
            txt="S'abonner"
            onPress={subscribe}
            isLoading={payMutation.isPending}
          />
          <Legals />
        </View>
      </ScrollView>
    </ScreenTemplate>
  );
};

export default SubscriptionModal;
