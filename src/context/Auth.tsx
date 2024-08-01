import { createAccount, getAccountById } from "@src/queries/account.query";
import { supabase } from "@src/utils/supabase";
import { Session, User } from "@supabase/supabase-js";
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string) => Promise;
  signIn: (email: string, password: string) => Promise;
  signOut: () => Promise;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

type AuthProviderProps = {
  children: ReactNode;
};

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;

    async function getInitialSession() {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (!mounted) return;
      if (error)
        console.error("Error fetching initial session:", error.message);
      if (session) {
        setSession(session);
        await getAccountById(session.user.id)
          .then(({ account }) => {
            setUser(account);
          })
          .finally(() => {
            setLoading(false);
          });
      } else {
        setLoading(false);
      }
    }

    getInitialSession();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (mounted) {
          setSession(session);
          if (session)
            getAccountById(session.user.id)
              .then(({ account }) => {
                setUser(account);
              })
              .finally(() => {
                setLoading(false);
              });
          else setLoading(false);
        }
      },
    );

    return () => {
      mounted = false;
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string) => {
    // const firstTestGradeOn20 = await getAsyncStorage(ID_FIRST_TEST);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) throw error;

    setSession(data?.session);
    const account = {
      id: data.session?.user.id,
      email,
    };
    if (data)
      await createAccount(account)
        .then((result) => {
          setUser(result.account);
        })
        .catch((error) => {
          console.warn("Error creating account:", error);
        });
  };

  const signIn = async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) throw error;

    setSession(data?.session);
    setUser(data?.user);
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    setUser(null);
  };

  const value: AuthContextType = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
