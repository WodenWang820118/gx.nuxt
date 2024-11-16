export function useLoginLogic() {
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const email = useState(() => null);
  const password = useState(() => null);
  const successMsg = useState<string>(() => '');
  const errorMsg = useState<string>(() => '');

  const login = async () => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.value,
      password: password.value
    });

    if (error) {
      successMsg.value = null;
      errorMsg.value = error.message;
      return;
    }

    errorMsg.value = null;
    successMsg.value = 'Redirecting...';
    setTimeout(async () => {
      successMsg.value = null;
      await navigateTo('/');
    }, 2000);
  };

  const githubLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'github'
    });

    if (error) {
      successMsg.value = null;
      errorMsg.value = error.message;
      return;
    }

    errorMsg.value = null;
    successMsg.value = 'Redirecting...';
    setTimeout(async () => {
      successMsg.value = null;
      await navigateTo('/');
    }, 2000);
  };

  const googleLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'google'
    });

    if (error) {
      successMsg.value = null;
      errorMsg.value = error.message;
      return;
    }

    errorMsg.value = null;
    successMsg.value = 'Redirecting...';
    setTimeout(async () => {
      successMsg.value = null;
      await navigateTo('/');
    }, 2000);
  };

  onMounted(() => {
    if (user.value) {
      navigateTo('/');
    }
  });

  return {
    email,
    password,
    successMsg,
    errorMsg,
    login,
    githubLogin,
    googleLogin
  };
}
