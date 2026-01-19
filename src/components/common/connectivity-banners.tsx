import MyText from "@components/natives/MyText";
import { supabase } from "@utils/supabase";
import NetInfo from "@react-native-community/netinfo";
import { WifiSlash, WarningCircle } from "phosphor-react-native";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BACKEND_CHECK_INTERVAL = 30000;

export function ConnectivityBanners(): React.ReactNode {
  const insets = useSafeAreaInsets();
  const [isConnected, setIsConnected] = useState(true);
  const [isBackendReachable, setIsBackendReachable] = useState(true);

  useEffect(() => {
    const unsubscribe = NetInfo.addEventListener((state) => {
      setIsConnected(state.isConnected ?? true);
    });
    return () => unsubscribe();
  }, []);

  const checkBackend = useCallback(async (): Promise<void> => {
    try {
      const { error } = await supabase.from("accounts").select("id").limit(1);
      setIsBackendReachable(!error);
    } catch {
      setIsBackendReachable(false);
    }
  }, []);

  useEffect(() => {
    if (!isConnected) return undefined;
    const timeout = setTimeout(checkBackend, 0);
    const interval = setInterval(checkBackend, BACKEND_CHECK_INTERVAL);
    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [isConnected, checkBackend]);

  if (isConnected && isBackendReachable) {
    return null;
  }

  if (!isConnected) {
    return (
      <View
        className="flex-row items-center justify-center gap-2 bg-red-500 px-4 py-2"
        style={{ paddingTop: insets.top }}
      >
        <WifiSlash size={16} color="#fff" />
        <MyText className="text-sm font-medium text-white">
          Pas de connexion internet
        </MyText>
      </View>
    );
  }

  return (
    <View
      className="flex-row items-center justify-center gap-2 bg-yellow-500 px-4 py-2"
      style={{ paddingTop: insets.top }}
    >
      <WarningCircle size={16} color="#fff" />
      <MyText className="text-sm font-medium text-white">
        Serveur indisponible
      </MyText>
    </View>
  );
}
