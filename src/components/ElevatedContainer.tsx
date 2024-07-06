import { ReactNode } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

interface ElevatedContainerProps {
  children: ReactNode;
  padding?: boolean;
  className?: string;
  style?: object;
}

const ElevatedContainer = ({
  children,
  padding = true,
  style,
}: ElevatedContainerProps) => (
  <SafeAreaView
    edges={["bottom"]}
    className={`rounded-t-2xl bg-white shadow-md ${padding && "pt-5 px-5"}`}
    style={style}
  >
    {children}
  </SafeAreaView>
);

export default ElevatedContainer;
