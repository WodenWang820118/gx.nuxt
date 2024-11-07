<template>
  <div>
    <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
      <!-- Breadcrumb -->
      <nav class="mx-auto max-w-7xl px-4 py-4">
        <ol
          class="flex items-center space-x-2 text-gray-600 dark:text-gray-400"
        >
          <li>
            <NuxtLink
              to="/"
              class="hover:text-blue-600"
              >Home</NuxtLink
            >
          </li>
          <li>
            <span class="mx-2">/</span>
          </li>
          <li>
            <NuxtLink
              to="/products"
              class="hover:text-blue-600"
              >Products</NuxtLink
            >
          </li>
          <li>
            <span class="mx-2">/</span>
          </li>
          <li class="text-blue-600">{{ title }}</li>
        </ol>
      </nav>

      <!-- Main Content -->
      <div class="mx-auto max-w-7xl px-4 py-8">
        <div class="grid grid-cols-1 gap-8 md:grid-cols-2">
          <!-- Product Image Section -->
          <div class="space-y-4">
            <div
              class="overflow-hidden rounded-lg bg-white p-4 shadow-lg dark:bg-gray-800"
            >
              <img
                :src="image || '/images/placeholder.png'"
                :alt="title"
                class="h-full w-full object-contain"
              />
            </div>
          </div>

          <!-- Product Details Section -->
          <div class="space-y-6">
            <div>
              <h1 class="text-3xl font-bold text-gray-900 dark:text-white">
                {{ title }}
              </h1>
              <p class="mt-4 text-lg text-gray-600 dark:text-gray-300">
                {{ description }}
              </p>
            </div>

            <!-- Rating -->
            <div class="flex items-center space-x-4">
              <h3 class="text-lg font-medium text-gray-900 dark:text-white"
                >Rating:</h3
              >
              <span
                class="rounded-full bg-blue-100 px-4 py-1 text-sm font-semibold text-blue-800
                  dark:bg-blue-200 dark:text-blue-800"
              >
                {{ getRandomRating() }}
              </span>
            </div>

            <!-- Price Section -->
            <div class="space-y-4">
              <div class="flex items-center space-x-4">
                <span class="text-4xl font-bold text-gray-900 dark:text-white">
                  ${{ price + 100 }}
                </span>
                <span
                  class="text-2xl font-medium text-gray-500 line-through dark:text-gray-400"
                >
                  ${{ (price + 100) * 2 }}
                </span>
                <span
                  class="rounded-full bg-green-100 px-4 py-1 text-sm font-semibold text-green-800"
                >
                  50% OFF
                </span>
              </div>
            </div>

            <!-- Add to Cart -->
            <div class="space-y-4">
              <button
                class="w-full rounded-lg bg-blue-700 px-8 py-4 text-center text-lg font-medium
                  text-white transition hover:bg-blue-800 focus:outline-none focus:ring-4
                  focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700
                  dark:focus:ring-blue-800"
                @click="addToCart(product)"
              >
                <span v-if="alreadyInCart(cart, product) && user"
                  >Item Added</span
                >
                <span v-else>Add to Cart</span>
              </button>
            </div>

            <!-- Additional Details -->
            <div
              class="mt-8 border-t border-gray-200 pt-8 dark:border-gray-700"
            >
              <h3 class="text-lg font-medium text-gray-900 dark:text-white"
                >Product Details</h3
              >
              <div class="mt-4 space-y-3">
                <p class="text-gray-600 dark:text-gray-300">
                  • Free Delivery Available
                </p>
                <p class="text-gray-600 dark:text-gray-300">
                  • 30-Day Return Policy
                </p>
                <p class="text-gray-600 dark:text-gray-300">
                  • 1 Year Warranty
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Product } from '../../utils/product.interface';
  import { useCart } from '../../composables/state';
  import { useProductLogic } from './product.script';

  defineProps<{
    id: string;
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
    product: Product;
  }>();

  const user = useSupabaseUser();
  const cart = useCart();
  const { getRandomRating, addToCart, alreadyInCart } = useProductLogic();
</script>
