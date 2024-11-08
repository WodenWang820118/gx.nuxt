<template>
  <div class="container mx-auto px-4 py-8">
    <!-- Cart Header -->
    <h1 class="mb-8 text-2xl font-bold text-gray-800 dark:text-white"
      >Shopping Cart</h1
    >

    <div class="flex flex-col gap-8 lg:flex-row">
      <!-- Cart Items Section -->
      <div class="lg:w-2/3">
        <div class="rounded-lg bg-white shadow dark:bg-gray-800">
          <!-- Cart Items -->
          <div v-if="cart && cart.length > 0">
            <div
              v-for="product in cart"
              :key="product.id"
              class="flex flex-col items-center gap-4 border-b border-gray-200 p-6 sm:flex-row
                dark:border-gray-700"
            >
              <!-- Product Image -->
              <div class="h-24 w-24 flex-shrink-0">
                <img
                  :src="
                    product.image ? product.image : '/images/placeholder.png'
                  "
                  :alt="product.title"
                  class="h-full w-full rounded-md object-cover"
                />
              </div>

              <!-- Product Details -->
              <div class="flex-grow space-y-2">
                <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                  {{ product.title }}
                </h3>
                <p class="text-sm text-gray-500 dark:text-gray-400">
                  {{ product.category }}
                </p>
                <div class="flex items-center justify-between">
                  <span
                    class="text-lg font-semibold text-gray-900 dark:text-white"
                  >
                    ${{ product.price }}
                  </span>

                  <!-- Quantity Controls -->
                  <div class="flex items-center rounded-md border">
                    <button
                      class="border-r px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                      @click="decreaseQuantity(product)"
                      >-</button
                    >
                    <span class="px-4 py-1">{{ product.quantity || 1 }}</span>
                    <button
                      class="border-l px-3 py-1 hover:bg-gray-100 dark:hover:bg-gray-700"
                      @click="increaseQuantity(product)"
                      >+</button
                    >
                  </div>
                </div>
              </div>

              <!-- Remove Button -->
              <button
                class="p-2 text-red-500 transition-colors hover:text-red-700"
                @click="removeFromCart(product)"
              >
                <Icon
                  name="fa:remove"
                  size="20"
                />
              </button>
            </div>
          </div>

          <!-- Empty Cart State -->
          <div
            v-else
            class="p-8 text-center text-gray-500 dark:text-gray-400"
          >
            Your cart is empty
          </div>
        </div>
      </div>

      <!-- Order Summary Section -->
      <div class="lg:w-1/3">
        <div
          class="sticky top-4 rounded-lg bg-white p-6 shadow dark:bg-gray-800"
        >
          <h2 class="mb-4 text-xl font-semibold text-gray-900 dark:text-white">
            Order Summary
          </h2>

          <div class="space-y-4">
            <div class="flex justify-between text-gray-600 dark:text-gray-400">
              <span>Subtotal</span>
              <span>${{ calcTotalCart() }}</span>
            </div>

            <div class="border-t border-gray-200 pt-4 dark:border-gray-700">
              <div
                class="flex justify-between text-lg font-semibold text-gray-900 dark:text-white"
              >
                <span>Total</span>
                <span>${{ calcTotalCart() }}</span>
              </div>
            </div>

            <button
              class="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-white transition-colors
                hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-300
                dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800"
              @click="navigateToCheckout"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { useCartLogic } from './cart.script';

  const {
    calcTotalCart,
    removeFromCart,
    navigateToCheckout,
    decreaseQuantity,
    increaseQuantity,
    cart
  } = useCartLogic();
</script>
