<template>
  <div class="text-center">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900
        md:text-5xl lg:text-6xl dark:text-white"
      >Are you sure you want to logout?</h1
    >
    <br />
    <button
      type="button"
      class="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white
        hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
        dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      @click="logout"
      >Yes Log me out</button
    >
    <NuxtLink to="/">
      <button
        type="button"
        class="mb-2 me-2 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm
          font-medium text-gray-900 hover:bg-gray-100 hover:text-blue-700 focus:z-10
          focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600
          dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white
          dark:focus:ring-gray-700"
        >No, go back to home page</button
      >
    </NuxtLink>

    <!-- Success Message -->
    <div v-if="successMsg">
      <p
        id="filled_success_help"
        class="mt-2 text-xs text-green-600 dark:text-green-400"
        ><span class="font-medium">Well done! </span>{{ successMsg }}</p
      >
    </div>

    <!-- Errorr message -->
    <div v-if="errorMsg">
      <p
        id="filled_error_help"
        class="mt-2 text-xs text-red-600 dark:text-red-400"
        ><span class="font-medium">Oh, snapp! </span>{{ errorMsg }}</p
      >
    </div>
  </div>
</template>

<script setup>
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const successMsg = useState(() => null);
  const errorMsg = useState(() => null);

  const logout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      successMsg.value = null;
      errorMsg.value = error.message;
      return;
    }

    successMsg.value = 'Hope to see you again soon, Redirecting...';
    setTimeout(async () => {
      successMsg.value = null;
      await navigateTo('/');
    }, 2000);
  };

  definePageMeta({
    middleware: [
      async () => {
        const user = useSupabaseUser();
        if (!user.value) await navigateTo('/login');
      }
    ]
  });
</script>
