import sleep from "@src/utils/sleep";
import React, { useEffect, useState } from "react";
import { Modal, Platform, View } from "react-native";

interface ModalTemplateProps {
  children: React.ReactNode;
  visible: boolean;
  style?: string;
  close?: () => void;
  showInstantly?: boolean;
}

const ModalTemplate = ({
  children,
  visible,
  style,
  close,
  showInstantly = false,
}: ModalTemplateProps) => {
  const [visibleWithTimer, setVisibleWithTimer] = useState(false);

  useEffect(() => {
    if (visible)
      sleep(300).then(() => setVisibleWithTimer(true)); // On affiche le modal après 300ms pour éviter qu'on est 2 modals en même temps et donc qu'une ne s'affiche pas
    else setVisibleWithTimer(false);
  }, [visible]);

  if (!showInstantly && !visibleWithTimer) return null;

  return (
    <Modal
      visible={visible}
      onRequestClose={() => {
        setVisibleWithTimer(false);
        close?.();
      }}
      transparent
      animationType="fade"
    >
      <View className={`items-center justify-center flex-1 px-4 bg-overlay`}>
        <View
          className={`items-center justify-center bg-white w-full px-8 py-7 rounded-2xl shadow-2xl ${Platform.OS === "web" && "w-1/2"} ${style}`}
        >
          {children}
        </View>
      </View>
    </Modal>
  );
};

export default ModalTemplate;
