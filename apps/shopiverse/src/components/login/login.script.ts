import { useAuthStore } from '../../stores/auth';

export function useLoginLogic() {
  const authStore = useAuthStore();
  const email = useState<string>(() => '');
  const password = useState<string>(() => '');
  const successMsg = useState<string>(() => '');
  const errorMsg = useState<string>(() => '');
  const loading = ref(false);
  const isGoogleLoading = ref(false);

  // Log when component is initialized
  console.log('🟩 [LOGIN SCRIPT] Component initialized');

  const login = async () => {
    // Clear previous messages
    successMsg.value = '';
    errorMsg.value = '';

    if (!email.value || !password.value) {
      errorMsg.value = 'Please enter email and password';
      return;
    }

    loading.value = true;

    try {
      await authStore.login(email.value, password.value);

      successMsg.value = 'Login successful! Redirecting...';
      setTimeout(async () => {
        successMsg.value = '';
        await navigateTo('/');
      }, 1500);
    } catch (error) {
      errorMsg.value = error instanceof Error ? error.message : 'Login failed';
    } finally {
      loading.value = false;
    }
  };

  const loginWithGoogle = async () => {
    console.log('[LOGIN] 🟢 loginWithGoogle called! (from LOGIN page)');
    // Clear previous messages
    successMsg.value = '';
    errorMsg.value = '';
    isGoogleLoading.value = true;

    try {
      console.log('[LOGIN] Starting Google login...');
      console.log('[LOGIN] Auth store exists:', !!authStore);
      console.log(
        '[LOGIN] Auth store.loginWithGoogle exists:',
        !!authStore.loginWithGoogle
      );

      const result = await authStore.loginWithGoogle();
      console.log('[LOGIN] Google login result:', result);

      if (result && 'redirecting' in result && result.redirecting) {
        console.log('[LOGIN] Redirecting to Google...');
        // Don't show success message or navigate - we're redirecting
        // Don't reset isGoogleLoading - we're leaving the page
        return;
      }

      successMsg.value = 'Sign in successful! Redirecting...';
      setTimeout(async () => {
        successMsg.value = '';
        await navigateTo('/');
      }, 1500);
    } catch (error) {
      console.error('[LOGIN] Google login error:', error);
      errorMsg.value =
        error instanceof Error ? error.message : 'Google sign-in failed';
      isGoogleLoading.value = false;
    }
  };

  return {
    email,
    password,
    loading,
    isGoogleLoading,
    successMsg,
    errorMsg,
    login,
    loginWithGoogle
  };
}
