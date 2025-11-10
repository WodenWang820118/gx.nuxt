<template>
  <div>
    <form
      :schema="schema"
      class="mx-auto max-w-md"
      @submit.prevent="signUp"
    >
      <div class="group relative z-0 mb-5 w-full">
        <input
          id="floating_email"
          v-model="state.email"
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
          v-model="state.password"
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
            v-model="state.userName"
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
            v-model="state.address"
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
        @click="signUp"
        >Submit</button
      >

      <div class="my-4 flex items-center">
        <div class="flex-grow border-t border-gray-300"></div>
        <span class="mx-4 text-sm text-gray-500">OR</span>
        <div class="flex-grow border-t border-gray-300"></div>
      </div>

      <button
        type="button"
        :disabled="isGoogleLoading"
        class="flex w-full items-center justify-center gap-3 rounded-lg border border-gray-300
          bg-white px-5 py-2.5 text-center text-sm font-medium text-gray-900
          hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200
          disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto dark:border-gray-600
          dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-700"
        @click="
          () => {
            console.log('🔴 BUTTON CLICKED!');
            signUpWithGoogle();
          }
        "
      >
        <svg
          class="h-5 w-5"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <span>{{
          isGoogleLoading ? 'Signing in...' : 'Continue with Google'
        }}</span>
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
  import { useRegisterLogic } from './register.script';

  const {
    state,
    successMsg,
    errorMsg,
    signUp,
    signUpWithGoogle,
    isGoogleLoading,
    schema
  } = useRegisterLogic();
</script>
