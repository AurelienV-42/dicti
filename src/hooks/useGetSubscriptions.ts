import { getPackages } from "@src/utils/purchase";
import { useEffect, useState } from "react";

type SubscriptionType = {
  id: string;
  nbMonth: number;
  priceByMonth: string;
  priceTotal: string;
};

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
          const formattedPackages = packages.map((p) => {
            return {
              id: p.product.identifier,
              nbMonth: p.nbMonths,
              priceByMonth: p.priceByMonthString,
              priceTotal: p.priceString,
            };
          });
          setSubscriptions(packages);
        })
        .catch((error) => {
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
