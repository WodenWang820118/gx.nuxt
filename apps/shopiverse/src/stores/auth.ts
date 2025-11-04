// Simplified auth store without Supabase (for demonstration purposes)
export const useAuthStore = defineStore('auth', () => {
  const user: Ref<{
    id: string;
    email: string;
    full_name?: string;
    address?: string;
  } | null> = ref(null);
  const loading = ref(false);
  const error = ref(null);

  const setUser = (
    newUser: {
      id: string;
      email: string;
      full_name?: string;
      address?: string;
    } | null
  ) => {
    user.value = newUser;
  };

  const initialize = async () => {
    loading.value = true;
    // Mock initialization for demo
    loading.value = false;
  };

  return {
    user,
    loading,
    error,
    setUser,
    initialize
  };
});
