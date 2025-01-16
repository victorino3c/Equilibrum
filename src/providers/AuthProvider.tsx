import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { useRouter } from 'expo-router';
import { Session } from '@supabase/supabase-js';
import { supabase } from '@libs/supabase';

import { appStore } from 'src/store/AppStore';

type AuthData = {
  session: Session | null;
  profile: any;
  loading: boolean;
  isAdmin: boolean;
  signUp: (email: string, password: string) => Promise<any>;
  setProfileUsername: (id: string, username: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthData>({
  session: null,
  loading: true,
  profile: null,
  isAdmin: false,
  signUp: async () => {},
  setProfileUsername: async () => {},
  signIn: async () => {},
  signOut: async () => {},
});

export default function AuthProvider({ children }: PropsWithChildren) {
  const { hasEnteredUserInfo } = appStore();

  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchSession = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      setSession(session);

      if (session) {
        const { data } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        setProfile(data);
      }

      setLoading(false);
    };

    fetchSession();

    // Listen for changes to the auth state.
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (session) {
        router.push('/(protected)/(tabs)/(health)');
      }
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string): Promise<any> => {
    setLoading(true);
    try {
      const { error, data } = await supabase.auth.signUp({ email, password });

      if (error) throw error;

      if (!hasEnteredUserInfo) {
        router.push('/(userInfo)');
      } else {
        router.push('/(protected)/(tabs)/(health)');
      }

      return data;
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const setProfileUsername = async (id: string, username: string) => {
    setLoading(true);
    try {
      const { error: profError } = await supabase
        .from('profiles')
        .update({ username: username })
        .eq('id', id);

      if (profError) throw profError;
    } catch (error: any) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    setLoading(true);
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      alert(error.message);
    } else {
      if (!hasEnteredUserInfo) {
        router.push('/(userInfo)');
      } else {
        router.push('/(protected)/(tabs)/(health)');
      }
    }
    setLoading(false);
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    router.push('/(onboarding)');
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        loading,
        profile,
        isAdmin: profile?.group === 'ADMIN',
        signUp,
        setProfileUsername,
        signIn,
        signOut,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
