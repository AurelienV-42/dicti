import { User, UserResult } from "@appTypes/database";
import { TablesUpdate } from "@appTypes/supabase";
import { supabase } from "@utils/supabase";

export const getUserById = async (userId: string): Promise<UserResult> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return { user: data as User, error: null };
  } catch (error) {
    return { user: null, error: error as Error };
  }
};

export const updateUser = async (
  userId: string,
  updates: TablesUpdate<"users">,
): Promise<UserResult> => {
  try {
    const { data, error } = await supabase
      .from("users")
      .update(updates)
      .eq("id", userId)
      .select()
      .single();

    if (error) throw error;
    return { user: data as User, error: null };
  } catch (error) {
    return { user: null, error: error as Error };
  }
};
