<template>
  <div>
    <form
      class="mx-auto max-w-md"
      @submit.prevent="signUp"
    >
      <div class="group relative z-0 mb-5 w-full">
        <input
          id="floating_email"
          v-model="email"
          type="email"
          name="floating_email"
          class="peer block w-full appearance-none border-0 border-b-2 border-gray-300
            bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600
            focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white
            dark:focus:border-blue-500"
          placeholder=" "
          required
        />
        <label
          for="floating_email"
          class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm
            text-gray-500 duration-300 peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6
            peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600
            rtl:peer-focus:left-auto rtl:peer-focus:translate-x-1/4 dark:text-gray-400
            peer-focus:dark:text-blue-500"
          >Email address</label
        >
      </div>
      <div class="group relative z-0 mb-5 w-full">
        <input
          id="floating_password"
          v-model="password"
          type="password"
          name="floating_password"
          class="peer block w-full appearance-none border-0 border-b-2 border-gray-300
            bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600
            focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white
            dark:focus:border-blue-500"
          placeholder=" "
          required
        />
        <label
          for="floating_password"
          class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm
            text-gray-500 duration-300 peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6
            peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600
            rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
          >Password</label
        >
      </div>

      <div class="grid md:grid-cols-2 md:gap-6">
        <div class="group relative z-0 mb-5 w-full">
          <input
            id="floating_first_name"
            v-model="userName"
            type="text"
            name="floating_first_name"
            class="peer block w-full appearance-none border-0 border-b-2 border-gray-300
              bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600
              focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white
              dark:focus:border-blue-500"
            placeholder=" "
            required
          />
          <label
            for="floating_first_name"
            class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm
              text-gray-500 duration-300 peer-placeholder-shown:translate-y-0
              peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6
              peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600
              rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >Full name</label
          >
        </div>
        <div class="group relative z-0 mb-5 w-full">
          <input
            id="floating_last_name"
            v-model="address"
            type="text"
            name="floating_last_name"
            class="peer block w-full appearance-none border-0 border-b-2 border-gray-300
              bg-transparent px-0 py-2.5 text-sm text-gray-900 focus:border-blue-600
              focus:outline-none focus:ring-0 dark:border-gray-600 dark:text-white
              dark:focus:border-blue-500"
            placeholder=" "
            required
          />
          <label
            for="floating_last_name"
            class="absolute top-3 -z-10 origin-[0] -translate-y-6 scale-75 transform text-sm
              text-gray-500 duration-300 peer-placeholder-shown:translate-y-0
              peer-placeholder-shown:scale-100 peer-focus:start-0 peer-focus:-translate-y-6
              peer-focus:scale-75 peer-focus:font-medium peer-focus:text-blue-600
              rtl:peer-focus:translate-x-1/4 dark:text-gray-400 peer-focus:dark:text-blue-500"
            >Address</label
          >
        </div>
      </div>
      <div class="grid md:grid-cols-2 md:gap-6"> </div>
      <button
        type="submit"
        class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium
          text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
          sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >Submit</button
      >
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
    </form>
  </div>
</template>

<script setup lang="ts">
  const supabase = useSupabaseClient();
  const user = useSupabaseUser();
  const email = useState(() => null);
  const password = useState(() => null);
  const userName = useState(() => null);
  const address = useState(() => null);
  const successMsg = useState<string>(() => '');
  const errorMsg = useState<string>(() => '');

  if (user.value) {
    await navigateTo('/');
  }

  const signUp = async () => {
    const { data, error } = await supabase.auth.signUp({
      email: email.value,
      password: password.value,
      options: {
        data: {
          full_name: userName.value,
          address: address.value
        },
        emailRedirectTo: 'https://shopiversee.netlify.app/'
      }
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
      await navigateTo('/confirm');
    }, 2000);
  };
</script>
