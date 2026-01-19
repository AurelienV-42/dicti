import MyText from "@components/natives/MyText";
import NetInfo from "@react-native-community/netinfo";
import { supabase } from "@utils/supabase";
import { AlertCircle, LucideIcon, WifiOff } from "lucide-react-native";
import { useCallback, useEffect, useState } from "react";
import { Pressable } from "react-native";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const BACKEND_CHECK_INTERVAL = 30000;
const COLLAPSED_WIDTH = 34;
const EXPANDED_WIDTH = 164;
const ANIMATION_DURATION = 300;

const COLORS = {
  red: "rgba(239, 68, 68, 1)",
  yellow: "rgba(234, 179, 8, 1)",
} as const;

interface ConnectivityPillProps {
  top: number;
  color: keyof typeof COLORS;
  Icon: LucideIcon;
  text: string;
  expandedWidth?: number;
}

function ConnectivityPill({
  top,
  color,
  Icon,
  text,
  expandedWidth = EXPANDED_WIDTH,
}: ConnectivityPillProps): React.ReactNode {
  const [expanded, setExpanded] = useState(false);
  const width = useSharedValue(COLLAPSED_WIDTH);

  const animatedStyle = useAnimatedStyle(() => ({
    width: withTiming(width.value, { duration: ANIMATION_DURATION }),
  }));

  const handlePress = (): void => {
    const newExpanded = !expanded;
    setExpanded(newExpanded);
    width.value = newExpanded ? expandedWidth : COLLAPSED_WIDTH;
  };

  return (
    <Pressable
      onPress={handlePress}
      style={{
        position: "absolute",
        right: 16,
        top,
        zIndex: 50,
      }}
    >
      <Animated.View
        style={[
          {
            flexDirection: "row",
            alignItems: "center",
            overflow: "hidden",
            borderRadius: 9999,
            backgroundColor: COLORS[color],
            padding: 8,
          },
          animatedStyle,
        ]}
      >
        <Icon size={18} color="#fff" />
        {expanded && (
          <MyText
            className="ml-2 text-sm font-medium text-white"
            numberOfLines={1}
          >
            {text}
          </MyText>
        )}
      </Animated.View>
    </Pressable>
  );
}

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

  const top = insets.top + 8;

  if (isConnected) {
    return (
      <ConnectivityPill
        top={top}
        color="red"
        Icon={WifiOff}
        expandedWidth={146}
        text="Pas de connexion"
      />
    );
  }

  return (
    <ConnectivityPill
      top={top}
      color="yellow"
      Icon={AlertCircle}
      text="Serveur indisponible"
    />
  );
}
