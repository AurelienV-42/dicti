import Subscription from "@src/pages/subscription/Subscription";
import { Modal } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

interface SubscriptionModalProps {
  isVisible: boolean;
  close: () => void;
}

const SubscriptionModal = ({ isVisible, close }: SubscriptionModalProps) => {
  return (
    <Modal
      animationType="fade"
      visible={isVisible}
      className="absolute w-full h-full flex-1"
    >
      {/* Permit the SafeAreaView to have the good positioning in a modal */}
      <SafeAreaProvider>
        <Subscription close={close} />
      </SafeAreaProvider>
    </Modal>
  );
};

export default SubscriptionModal;
