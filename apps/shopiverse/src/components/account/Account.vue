<template>
  <div class="min-h-screen bg-gray-50 py-8 dark:bg-gray-900">
    <div class="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white"
          >Account Settings</h1
        >
        <p class="mt-1 text-sm text-gray-500 dark:text-gray-400"
          >Manage your account information and preferences</p
        >
      </div>

      <!-- Main Content -->
      <div class="rounded-lg bg-white shadow dark:bg-gray-800">
        <!-- Profile Section -->
        <div class="border-b border-gray-200 p-6 dark:border-gray-700">
          <h2 class="mb-4 text-lg font-medium text-gray-900 dark:text-white"
            >Profile Information</h2
          >

          <form class="space-y-6">
            <!-- Email Field -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Email</label
              >
              <input
                type="email"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
                  focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="your@email.com"
              />
            </div>

            <!-- Full Name Field -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Full Name</label
              >
              <input
                type="text"
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
                  focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                placeholder="John Doe"
              />
            </div>

            <!-- Address Field -->
            <div>
              <label
                class="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >Address</label
              >
              <textarea
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500
                  focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                rows="3"
                placeholder="Enter your address"
              ></textarea>
            </div>
          </form>
        </div>

        <!-- Authentication Methods -->
        <div class="p-6">
          <h2 class="mb-4 text-lg font-medium text-gray-900 dark:text-white"
            >Connected Accounts</h2
          >

          <div class="space-y-4">
            <!-- GitHub Login -->
            <div
              class="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            >
              <div class="flex items-center space-x-3">
                <svg
                  class="h-6 w-6 text-gray-700 dark:text-gray-300"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"
                  />
                </svg>
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >GitHub</span
                >
              </div>
              <button
                class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium
                  text-gray-700 hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-600
                  dark:text-gray-300 dark:hover:bg-gray-500"
              >
                Connect
              </button>
            </div>

            <!-- Google Login -->
            <div
              class="flex items-center justify-between rounded-lg bg-gray-50 p-4 dark:bg-gray-700"
            >
              <div class="flex items-center space-x-3">
                <svg
                  class="h-6 w-6 text-gray-700 dark:text-gray-300"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path
                    d="M12.545,10.239v3.821h5.445c-0.712,2.315-2.647,3.972-5.445,3.972c-3.332,0-6.033-2.701-6.033-6.032s2.701-6.032,6.033-6.032c1.498,0,2.866,0.549,3.921,1.453l2.814-2.814C17.503,2.988,15.139,2,12.545,2C7.021,2,2.543,6.477,2.543,12s4.478,10,10.002,10c8.396,0,10.249-7.85,9.426-11.748L12.545,10.239z"
                  />
                </svg>
                <span
                  class="text-sm font-medium text-gray-700 dark:text-gray-300"
                  >Google</span
                >
              </div>
              <button
                class="rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium
                  text-gray-700 hover:bg-gray-50 dark:border-gray-500 dark:bg-gray-600
                  dark:text-gray-300 dark:hover:bg-gray-500"
              >
                Connect
              </button>
            </div>
          </div>
        </div>

        <!-- Save Button -->
        <div class="border-t border-gray-200 px-6 py-4 dark:bg-gray-700">
          <button
            class="w-full rounded-md bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700
              focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
              sm:w-auto"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script steup lang="ts"></script>
