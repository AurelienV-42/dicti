import { View } from "react-native";
import MyPressable from "../natives/MyPressable";
import MyText from "../natives/MyText";

const DisplayProducts = ({
  products,
  selectedNbMonth,
  setSelectedNbMonth,
}: {
  products: {
    nbMonths: number;
    priceByMonthString: string;
    priceString: string;
  }[];
  selectedNbMonth: number;
  setSelectedNbMonth: (mbMonth: number) => void;
}) => {
  return (
    <View className="flex-row items-center justify-between gap-4 mb-4">
      {products.map((product, index) => (
        <MyPressable
          key={index}
          onPress={() => setSelectedNbMonth(product.nbMonths)}
          className={`flex-1 bg-white shadow-md items-center justify-center rounded-xl py-6 border-2 border-white ${
            selectedNbMonth === product.nbMonths && "border-blue-300"
          }`}
        >
          <MyText className="mb-4">
            {product.nbMonths === 1 ? "Mensuel" : "Annuel"}
          </MyText>
          <MyText className="text-xl">{product.priceByMonthString}</MyText>
          <MyText className="mb-4">par mois</MyText>
          <MyText className="text-2xl">{product.priceString}</MyText>
        </MyPressable>
      ))}
    </View>
  );
};

export default DisplayProducts;
