import { SubscriptionPackage } from "@appTypes/subscription";
import { getPackages } from "@utils/purchase";
import { useEffect, useState } from "react";

const useGetSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<SubscriptionPackage[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchSubscriptions = async () => {
      getPackages()
        .then((packages) => {
          if (!isMounted) return;
          if (!packages || packages.length === 0) {
            setError("Aucun abonnement disponible");
            setLoading(false);
            return;
          }
          setSubscriptions(packages);
        })
        .catch((error) => {
          if (!isMounted) return;
          console.warn(error);
          setError(error.message);
        })
        .finally(() => {
          if (isMounted) setLoading(false);
        });
    };

    fetchSubscriptions();

    return () => {
      isMounted = false;
    };
  }, []);

  return { subscriptions, loading, error };
};

export default useGetSubscriptions;
