export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const authStore = useAuthStore();

  // Initialize auth if not already initialized
  if (!authStore.isInitialized) {
    await authStore.initialize();
  }

  // Redirect to home if already authenticated
  if (authStore.user) {
    return navigateTo('/');
  }
});
