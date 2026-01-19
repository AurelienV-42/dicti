import { ReactNode } from "react";
import { Platform } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { twMerge } from "tailwind-merge";

interface ElevatedContainerProps {
  children: ReactNode;
  padding?: boolean;
  className?: string;
}

const ElevatedContainer = ({
  children,
  padding = true,
  className,
}: ElevatedContainerProps) => (
  <SafeAreaView
    edges={["bottom"]}
    className={twMerge(
      `rounded-t-2xl bg-white shadow-t-md ${padding && "pt-5 px-5"} ${Platform.OS === "android" && "pb-4"}`,
      className,
    )}
  >
    {children}
  </SafeAreaView>
);

export default ElevatedContainer;
