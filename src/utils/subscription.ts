import { getAsyncStorage } from "./asyncStorage";

export const isSubscribed = async () => {
  const unsubscribedDate = await getAsyncStorage("unsubscribedDate");
  const now = new Date();

  return unsubscribedDate && new Date(unsubscribedDate) > now;
};
