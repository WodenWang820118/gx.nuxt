<template>
  <div>
    <br /><br />
    <form class="mx-auto max-w-lg">
      <div class="mb-5">
        <label
          for="small-input"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Product Title</label
        >
        <input
          id="small-input"
          v-model="productTitle"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs
            text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
            dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div class="mb-5">
        <label
          for="small-input"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Product Category</label
        >
        <input
          id="small-input"
          v-model="productCategory"
          ype="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs
            text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
            dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>
      <div class="mb-5">
        <label
          for="small-input"
          class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
          >Product Price</label
        >
        <input
          id="small-input"
          v-model="productPrice"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2 text-xs
            text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
            dark:focus:border-blue-500 dark:focus:ring-blue-500"
        />
      </div>

      <label
        for="message"
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        >Product Description</label
      >
      <textarea
        id="message"
        v-model="productDescription"
        rows="4"
        class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm
          text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
          dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
          dark:focus:border-blue-500 dark:focus:ring-blue-500"
        placeholder="Write your product description here..."
      ></textarea>

      <br />
      <label
        class="mb-2 block text-sm font-medium text-gray-900 dark:text-white"
        for="user_avatar"
        >Upload a product image</label
      >
      <input
        id="user_avatar"
        class="block w-full cursor-pointer rounded-lg border border-gray-300 bg-gray-50 text-sm
          text-gray-900 focus:outline-none dark:border-gray-600 dark:bg-gray-700
          dark:text-gray-400 dark:placeholder-gray-400"
        aria-describedby="user_avatar_help"
        type="file"
        @change="handleFileChange"
      />
      <div
        id="user_avatar_help"
        class="mt-1 text-sm text-gray-500 dark:text-gray-300"
        >A good product image will help you sell more</div
      >

      <!-- Success Message -->
      <div v-if="imageUploadSuccessMsg">
        <p
          id="filled_success_help"
          class="mt-2 text-xs text-green-600 dark:text-green-400"
          ><span class="font-medium">Well done! </span
          >{{ imageUploadSuccessMsg }}</p
        >
      </div>

      <!-- Errorr message -->
      <div v-if="imageUploadErrorMsg">
        <p
          id="filled_error_help"
          class="mt-2 text-xs text-red-600 dark:text-red-400"
          ><span class="font-medium">Oh, snapp! </span
          >{{ imageUploadErrorMsg }}</p
        >
      </div>

      <br />

      <button
        type="button"
        class="mb-2 me-2 rounded-lg bg-gradient-to-br from-pink-500 to-orange-400 px-5 py-2.5
          text-center text-sm font-medium text-white hover:bg-gradient-to-bl
          focus:outline-none focus:ring-4 focus:ring-pink-200 dark:focus:ring-pink-800"
        @click="uploadImage"
        >Upload Image</button
      >

      <br /><br />

      <div class="inline-flex w-full items-center justify-center">
        <hr
          class="my-8 h-1 w-64 rounded border-0 bg-gray-200 dark:bg-gray-700"
        />
        <div
          class="absolute left-1/2 -translate-x-1/2 bg-white px-4 dark:bg-gray-900"
        >
          <svg
            class="h-4 w-4 text-gray-700 dark:text-gray-300"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 18 14"
          >
            <path
              d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z"
            />
          </svg>
        </div>
      </div>

      <button
        type="button"
        class="mb-2 me-2 rounded-lg bg-blue-700 px-5 py-2.5 text-sm font-medium text-white
          hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
          dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        @click="createProduct"
        >Submit Product</button
      >

      <button
        type="button"
        class="mb-2 me-2 rounded-lg bg-gradient-to-r from-red-200 via-red-300 to-yellow-200
          px-5 py-2.5 text-center text-sm font-medium text-gray-900
          hover:bg-gradient-to-bl focus:outline-none focus:ring-4 focus:ring-red-100
          dark:focus:ring-red-400"
        @click="clearEveryThing"
        >Clear Everything</button
      >

      <!-- Success Message -->
      <div v-if="productCreationSuccessMsg">
        <p
          id="filled_success_help"
          class="mt-2 text-xs text-green-600 dark:text-green-400"
          ><span class="font-medium">Well done! </span
          >{{ productCreationSuccessMsg }}</p
        >
      </div>

      <!-- Errorr message -->
      <div v-if="productCreationErrorMsg">
        <p
          id="filled_error_help"
          class="mt-2 text-xs text-red-600 dark:text-red-400"
          ><span class="font-medium">Oh, snapp! </span
          >{{ productCreationErrorMsg }}</p
        >
      </div>
    </form>
  </div>
</template>

<script setup lang="ts" src="./Sell.script.ts"></script>
