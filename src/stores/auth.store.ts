import { DEFAULT_NB_LIFES } from "@config/gamification";
import { createAccount, getAccountById } from "@src/queries/account.query";
import { Account } from "@src/types/database";
import { setAsyncStorage } from "@src/utils/asyncStorage";
import { supabase } from "@src/utils/supabase";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthState {
  user: Account | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: Account | null) => void;
  setSession: (session: Session | null) => void;
  setLoading: (loading: boolean) => void;
  signUp: (email: string, password: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  initAuth: () => () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  isAdmin: false,
  loading: true,

  setUser: (user) => set({ user, isAdmin: user?.role === "admin" }),
  setSession: (session) => set({ session }),
  setLoading: (loading) => set({ loading }),

  signUp: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signUp({ email, password });
    if (error) throw error;

    await setAsyncStorage("lifes", DEFAULT_NB_LIFES.toString());
    set({ session: data?.session });

    const account = { id: data.session?.user.id, email };
    if (data) {
      try {
        const result = await createAccount(account);
        set({
          user: result.account,
          isAdmin: result.account?.role === "admin",
        });
      } catch (err) {
        console.warn("Error creating account:", err);
      }
    }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;

    set({ session: data?.session });

    if (!data.session?.user) {
      console.warn("Failed to get user session");
      return;
    }
    const { account } = await getAccountById(data.session.user.id);
    set({ user: account, isAdmin: account?.role === "admin" });
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    set({ user: null, session: null, isAdmin: false });
  },

  initAuth: () => {
    let mounted = true;

    const getInitialSession = async (): Promise<void> => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;
      if (error)
        console.error("Error fetching initial session:", error.message);

      if (session) {
        set({ session });
        try {
          const { account } = await getAccountById(session.user.id);
          set({ user: account, isAdmin: account?.role === "admin" });
        } finally {
          set({ loading: false });
        }
      } else {
        set({ loading: false });
      }
    };

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (!mounted) return;
        set({ session });

        if (session) {
          try {
            const { account } = await getAccountById(session.user.id);
            set({ user: account, isAdmin: account?.role === "admin" });
          } finally {
            set({ loading: false });
          }
        } else {
          set({ loading: false });
        }
      },
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  },
}));

export const useAuth = (): AuthState => useAuthStore();
