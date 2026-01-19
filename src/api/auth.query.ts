import { supabase } from "@utils/supabase";

export const deleteAuthUser = async (): Promise<void> => {
  const { data, error } = await supabase.functions.invoke("delete_auth_user");

  if (error) throw error;

  return data;
};
