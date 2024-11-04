<template>
  <div>
    <nav class="border-gray-200 bg-gray-100 dark:bg-gray-900">
      <div
        class="mx-auto flex max-w-screen-xl flex-wrap items-center justify-between p-4"
      >
        <NuxtLink
          to="/"
          class="flex items-center space-x-3 rtl:space-x-reverse"
        >
          <Icon
            name="uil:shop"
            size="50"
            color="red"
          />
          <span
            class="self-center whitespace-nowrap text-2xl font-semibold dark:text-white"
            >Shopiverse</span
          >
        </NuxtLink>
        <div
          class="flex items-center space-x-3 md:order-2 md:space-x-0 rtl:space-x-reverse"
        >
          <button
            id="user-menu-button"
            type="button"
            class="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 md:me-0
              dark:focus:ring-gray-600"
            aria-expanded="false"
            data-dropdown-toggle="user-dropdown"
            data-dropdown-placement="bottom"
          >
            <span class="sr-only">Open user menu</span>
            <img
              class="h-8 w-8 rounded-full"
              src="/images/avatar.png"
              alt="user photo"
            />
          </button>
          <!-- Dropdown menu -->
          <div
            id="user-dropdown"
            class="z-50 my-4 hidden list-none divide-y divide-gray-100 rounded-lg bg-white
              text-base shadow dark:divide-gray-600 dark:bg-gray-700"
          >
            <div class="px-4 py-3">
              <span class="block text-sm text-gray-900 dark:text-white"
                >Hello {{ user.user_metadata.full_name }}</span
              >
              <span
                class="block truncate text-sm text-gray-500 dark:text-gray-400"
                >Welcome to Shopiverse</span
              >
            </div>
            <ul
              class="py-2"
              aria-labelledby="user-menu-button"
            >
              <li>
                <NuxtLink
                  to="/account"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200
                    dark:hover:bg-gray-600 dark:hover:text-white"
                  >My Account</NuxtLink
                >
              </li>
              <li>
                <NuxtLink
                  to="/logout"
                  class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200
                    dark:hover:bg-gray-600 dark:hover:text-white"
                  >Logout</NuxtLink
                >
              </li>
            </ul>
          </div>
          <button
            data-collapse-toggle="navbar-user"
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg p-2 text-sm
              text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2
              focus:ring-gray-200 md:hidden dark:text-gray-400 dark:hover:bg-gray-700
              dark:focus:ring-gray-600"
            aria-controls="navbar-user"
            aria-expanded="false"
          >
            <span class="sr-only">Open main menu</span>
            <svg
              class="h-5 w-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          id="navbar-user"
          class="hidden w-full items-center justify-between md:order-1 md:flex md:w-auto"
        >
          <ul
            class="mt-4 flex flex-col rounded-lg border border-gray-100 bg-gray-50 p-4 font-medium
              md:mt-0 md:flex-row md:space-x-8 md:border-0 md:bg-white md:p-0
              rtl:space-x-reverse dark:border-gray-700 dark:bg-gray-800 md:dark:bg-gray-900"
          >
            <li>
              <NuxtLink
                to="/search"
                class="block rounded bg-blue-700 px-3 py-2 text-white md:bg-transparent md:p-0
                  md:text-blue-700 md:dark:text-blue-500"
                aria-current="page"
                >Search</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/sell"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0
                  md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700
                  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white
                  md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >Sell on Shopiverse</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/about"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0
                  md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700
                  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white
                  md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
                >About</NuxtLink
              >
            </li>
            <li>
              <NuxtLink
                to="/cart"
                class="block rounded px-3 py-2 text-gray-900 hover:bg-gray-100 md:p-0
                  md:hover:bg-transparent md:hover:text-blue-700 dark:border-gray-700
                  dark:text-white dark:hover:bg-gray-700 dark:hover:text-white
                  md:dark:hover:bg-transparent md:dark:hover:text-blue-500"
              >
                <Icon
                  name="uil:shopping-cart"
                  color="green"
                  size="30"
                />
                Cart</NuxtLink
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
  const user = useSupabaseUser();
  import { initFlowbite } from 'flowbite';

  // initialize components based on data attribute selectors
  onMounted(() => {
    initFlowbite();
  });
  z;
</script>
