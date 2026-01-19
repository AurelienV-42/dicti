import colors from "@config/colors";
import { useIsLoading } from "@stores/loading.store";
import { ActivityIndicator, Modal, View } from "react-native";

const LoaderModal = () => {
  const { isLoading } = useIsLoading();

  return (
    <Modal animationType="fade" transparent visible={isLoading}>
      <View className="flex-1 items-end justify-center bg-overlay">
        <View className="absolute right-4 bottom-14 bg-white shadow-sm px-4 py-3 rounded-full items-center flex-row">
          <ActivityIndicator color={colors.gray["500"]} />
        </View>
      </View>
    </Modal>
  );
};

export default LoaderModal;
