<template>
  <div>
    <form class="mx-auto max-w-sm">
      <div class="mb-5">
        <label
          for="email"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Your email</label
        >
        <input
          id="email"
          v-model="email"
          type="email"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
            text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
            dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="name@flowbite.com"
          required
        />
      </div>
      <div class="mb-5">
        <label
          for="password"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Your password</label
        >
        <input
          id="password"
          v-model="password"
          type="password"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
            text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
            dark:focus:border-blue-500 dark:focus:ring-blue-500"
          required
        />
      </div>
      <button
        type="button"
        class="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium
          text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
          sm:w-auto dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="login"
        >Log In</button
      >
      <br /><br />
      <div
        id="g_id_onload"
        :data-client_id="runtimeConfig.public.googleClientId"
        data-context="signin"
        data-ux_mode="popup"
        :data-callback="handleSignInWithGoogle"
        data-auto_select="true"
        data-itp_support="true"
        data-use_fedcm_for_prompt="true"
      >
      </div>

      <div
        class="g_id_signin"
        data-type="standard"
        data-shape="pill"
        data-theme="outline"
        data-text="continue_with"
        data-size="large"
        data-logo_alignment="left"
      >
      </div>

      <div v-if="successMsg">
        <p
          id="filled_success_help"
          class="mt-2 text-xs text-green-600 dark:text-green-400"
          ><span class="font-medium">Well done! </span>{{ successMsg }}</p
        >
      </div>

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
  import { useLoginLogic } from './login.script';
  const runtimeConfig = useRuntimeConfig();

  const {
    email,
    password,
    successMsg,
    errorMsg,
    login,
    handleSignInWithGoogle
  } = useLoginLogic();
</script>
