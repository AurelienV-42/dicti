import { DEFAULT_NB_LIFES } from "@config/gamification";
import { getUserById } from "@api/user.query";
import { User } from "@appTypes/database";
import { setAsyncStorage } from "@utils/asyncStorage";
import { supabase } from "@utils/supabase";
import { Session } from "@supabase/supabase-js";
import { create } from "zustand";

interface AuthState {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  loading: boolean;
  setUser: (user: User | null) => void;
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

    if (data.session?.user.id) {
      const { user } = await getUserById(data.session.user.id);
      set({ user, isAdmin: user?.role === "admin" });
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
    const { user } = await getUserById(data.session.user.id);
    set({ user, isAdmin: user?.role === "admin" });
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
          const { user } = await getUserById(session.user.id);
          set({ user, isAdmin: user?.role === "admin" });
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
            const { user } = await getUserById(session.user.id);
            set({ user, isAdmin: user?.role === "admin" });
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
