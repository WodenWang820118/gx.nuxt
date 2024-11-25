import { User } from '@supabase/supabase-js';

export const useAuthStore = defineStore('auth', () => {
  const user: Ref<User | null> = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const supabase = useSupabaseClient();

  const setUser = (newUser: User | null) => {
    user.value = newUser;
  };

  const getSupabaseClient = () => {
    return supabase;
  };

  const initialize = async () => {
    loading.value = true;
    const { data, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Auth initialization error:', error);
    }

    if (data.user) {
      setUser(data.user);
    }

    // Set up auth state listener
    supabase.auth.onAuthStateChange((event, session) => {
      if (session?.user) {
        setUser(session.user);
      } else {
        setUser(null);
      }
    });
  };

  return {
    user,
    loading,
    error,
    setUser,
    getSupabaseClient,
    initialize
  };
});
