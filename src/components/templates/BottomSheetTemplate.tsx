import { TrueSheet } from "@lodev09/react-native-true-sheet";
import { useEffect, useRef } from "react";
import { Dimensions } from "react-native";

const SCREEN_HEIGHT = Dimensions.get("window").height;

interface BottomSheetTemplateProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  height?: number | "auto";
  scrollable?: boolean;
}

const BottomSheetTemplate = ({
  visible,
  onClose,
  children,
  height = "auto",
  scrollable = false,
}: BottomSheetTemplateProps) => {
  const sheet = useRef<TrueSheet>(null);

  useEffect(() => {
    if (visible) {
      sheet.current?.present();
    } else {
      sheet.current?.dismiss();
    }
  }, [visible]);

  const detents: (number | "auto")[] =
    height === "auto" ? ["auto"] : [height / SCREEN_HEIGHT];

  return (
    <TrueSheet
      ref={sheet}
      detents={detents}
      onDidDismiss={onClose}
      grabber={true}
      scrollable={scrollable}
    >
      {children}
    </TrueSheet>
  );
};

export default BottomSheetTemplate;
