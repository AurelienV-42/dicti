import { getIsSubscribed } from "@src/utils/purchase";
import { useEffect, useState } from "react";

const useIsSubscribed = () => {
  const [isSubscribed, setIsSubscribed] = useState(false);

  useEffect(() => {
    const checkSubscription = async () => {
      const isSubscribed = await getIsSubscribed();
      setIsSubscribed(isSubscribed);
    };

    checkSubscription();
  }, []);

  return { isSubscribed };
};

export default useIsSubscribed;
