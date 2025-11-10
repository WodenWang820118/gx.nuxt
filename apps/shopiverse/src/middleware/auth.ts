export default defineNuxtRouteMiddleware(async (to, _from) => {
  const authStore = useAuthStore();

  // Initialize auth if not already initialized
  if (!authStore.isInitialized) {
    await authStore.initialize();
  }

  // Check if user is authenticated
  if (!authStore.user) {
    // Redirect to login page if trying to access protected route
    return navigateTo('/login');
  }
});
