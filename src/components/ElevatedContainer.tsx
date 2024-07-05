import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ElevatedContainerProps {
  children: ReactNode;
  padding?: boolean;
}

const ElevatedContainer = ({
  children,
  padding = true,
}: ElevatedContainerProps) => (
  <SafeAreaView
    edges={["bottom"]}
    className={`flex-1 rounded-t-2xl bg-white shadow-md ${padding && "pt-5 px-5"}`}
  >
    {children}
  </SafeAreaView>
);

export default ElevatedContainer;
