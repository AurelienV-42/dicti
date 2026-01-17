import { useNavigation } from "@react-navigation/native";
import { useAuth } from "@src/stores/auth.store";
import { logInRevenueCat } from "@src/utils/purchase";
import resetTo from "@src/utils/resetTo";
import { useEffect } from "react";

const useManageRoute = () => {
  const navigation = useNavigation();
  const { user, loading } = useAuth();

  useEffect(() => {
    const manageRoute = async () => {
      if (loading) return;

      if (!user) {
        resetTo(navigation, "Introduction");
      } else {
        await logInRevenueCat(user.id, user.email);
        resetTo(navigation, "Home");
      }
    };

    manageRoute();
  }, [navigation, user, loading]);
};

export default useManageRoute;
