import { getPackages } from "@src/utils/purchase";
import { useEffect, useState } from "react";

const useGetSubscriptions = () => {
  const [subscriptions, setSubscriptions] = useState<any[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSubscriptions = async () => {
      getPackages()
        .then((packages) => {
          if (!packages || packages.length === 0) {
            setError("Aucun abonnement disponible");
            setLoading(false);
            return;
          }
          setSubscriptions(packages);
        })
        .catch((error) => {
          console.warn(error);
          setError(error.message);
        })
        .finally(() => {
          setLoading(false);
        });
    };

    fetchSubscriptions();
  }, []);

  return { subscriptions, loading, error };
};

export default useGetSubscriptions;
