import { Account, AccountResult, CreateAccountData } from "@appTypes/database";
import { supabase } from "@utils/supabase";

export const getAccountById = async (
  userId: string,
): Promise<AccountResult> => {
  try {
    const { data, error } = await supabase
      .from("account")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;
    return { account: data as Account, error: null };
  } catch (error) {
    return { account: null, error: error as Error };
  }
};

export const createAccount = async (
  data: CreateAccountData,
): Promise<AccountResult> => {
  try {
    const { data: account, error } = await supabase
      .from("account")
      .insert(data)
      .select()
      .single();

    if (error) throw error;
    return { account: account as Account, error: null };
  } catch (error) {
    return { account: null, error: error as Error };
  }
};

export const updateAccount = async (
  userId: string,
  updates: Partial<Account>,
): Promise<AccountResult> => {
  try {
    const { data, error } = await supabase
      .from("account")
      .update(updates)
      .eq("id", userId)
      .single();

    if (error) throw error;
    return { account: data as Account, error: null };
  } catch (error) {
    return { account: null, error: error as Error };
  }
};
