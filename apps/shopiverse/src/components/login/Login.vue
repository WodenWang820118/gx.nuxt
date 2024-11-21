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
      <button
        type="button"
        class="mb-2 me-2 inline-flex items-center rounded-lg bg-[#4285F4] px-5 py-2.5
          text-center text-sm font-medium text-white hover:bg-[#4285F4]/90
          focus:outline-none focus:ring-4 focus:ring-[#4285F4]/50
          dark:focus:ring-[#4285F4]/55"
        @click="googleLogin"
      >
        <svg
          class="me-2 h-4 w-4"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="currentColor"
          viewBox="0 0 18 19"
        >
          <path
            fill-rule="evenodd"
            d="M8.842 18.083a8.8 8.8 0 0 1-8.65-8.948 8.841 8.841 0 0 1 8.8-8.652h.153a8.464 8.464 0 0 1 5.7 2.257l-2.193 2.038A5.27 5.27 0 0 0 9.09 3.4a5.882 5.882 0 0 0-.2 11.76h.124a5.091 5.091 0 0 0 5.248-4.057L14.3 11H9V8h8.34c.066.543.095 1.09.088 1.636-.086 5.053-3.463 8.449-8.4 8.449l-.186-.002Z"
            clip-rule="evenodd"
          />
        </svg>
        Sign in with Google
      </button>

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
  const {
    email,
    password,
    successMsg,
    errorMsg,
    login,
    githubLogin,
    googleLogin
  } = useLoginLogic();
</script>
