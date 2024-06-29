import { View } from "react-native";
import MyPressable from "../natives/MyPressable";
import MyText from "../natives/MyText";

const DisplayProducts = ({
  products,
  selectedNbMonth,
  setSelectedNbMonth,
}: {
  products: {
    nbMonth: number;
    priceByMonth: string;
    priceTotal: string;
  }[];
  selectedNbMonth: number;
  setSelectedNbMonth: (mbMonth: number) => void;
}) => {
  return (
    <View className="flex-row items-center justify-between gap-4 mb-4">
      {products.map((product, index) => (
        <MyPressable
          key={index}
          onPress={() => setSelectedNbMonth(product.nbMonth)}
          className={`flex-1 bg-light-100 shadow-md items-center justify-center rounded-xl py-6 border-2 border-light-100 ${
            selectedNbMonth === product.nbMonth && "border-orange"
          }`}
        >
          <MyText style="mb-4">
            {product.nbMonth === 1 ? "Mensuel" : "Annuel"}
          </MyText>
          <MyText style="text-2xl">{product.priceByMonth}</MyText>
          <MyText style="mb-4">par mois</MyText>
          <MyText style="">{product.priceTotal}</MyText>
        </MyPressable>
      ))}
    </View>
  );
};

export default DisplayProducts;
