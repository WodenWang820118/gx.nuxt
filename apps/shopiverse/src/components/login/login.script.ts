import { useAuthStore } from '../../stores/auth';
import { AuthService } from '../../services/AuthService';
import { GoogleSignInResponse } from '../../utils/google.interface';

export function useLoginLogic() {
  const authStore = useAuthStore();
  const authService = new AuthService();
  const email = useState<string | null>(() => null);
  const password = useState<string | null>(() => null);
  const successMsg = useState<string | null>(() => null);
  const errorMsg = useState<string | null>(() => null);

  const login = async () => {
    const res = await authService.login(email.value, password.value);
    if (res.error) {
      successMsg.value = null;
      errorMsg.value = res.error.message;
      return;
    }
    console.log('User signed in');
    console.log('User: ', res.data?.user);
    authStore.setUser(res.data?.user || null);
    errorMsg.value = null;
    successMsg.value = 'Redirecting...';
  };

  const handleSignInWithGoogle = async (response: GoogleSignInResponse) => {
    const res = await authService.handleSignInWithGoogle(response);
    if (res.error) {
      successMsg.value = null;
      errorMsg.value = res.error.message;
      return;
    }
    console.log('data: ', res.data);
    authStore.setUser(res.data.user);
    errorMsg.value = null;
    successMsg.value = 'Redirecting...';
  };

  watch(
    () => authStore.user,
    (user) => {
      if (user) {
        console.log('User signed in');
        console.log('User: ', user);
        navigateTo('/');
      }
    }
  );

  return {
    email,
    password,
    successMsg,
    errorMsg,
    login,
    handleSignInWithGoogle
  };
}
