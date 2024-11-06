<template>
  <div :id="`productcomp${id}`">
    <div
      class="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow
        dark:border-gray-700 dark:bg-gray-800"
    >
      <NuxtLink :to="`${id}`">
        <img
          class="rounded-t-lg p-8"
          :src="`${image}`"
          alt="product image"
        />
      </NuxtLink>
      <div class="px-5 pb-5">
        <NuxtLink :to="`${id}`">
          <h5
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >{{ title }}</h5
          >
        </NuxtLink>
        <NuxtLink :to="`${id}`">
          <p class="mb-3 truncate text-gray-500 dark:text-gray-400">{{
            description
          }}</p>
        </NuxtLink>
        <div class="mb-5 mt-2.5 flex items-center">
          <h5>Rating: </h5>
          <span
            class="ms-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800
              dark:bg-blue-200 dark:text-blue-800"
            >{{ getRandomRating() }}</span
          >
        </div>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-gray-900 dark:text-white">{{
            price
          }}</span>

          <span
            class="text-3xl font-bold text-gray-900 line-through dark:text-white"
            >{{ price * 2 }}</span
          >
          <button
            class="rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white
              hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300
              dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            @click="addToCart(product)"
          >
            <span v-if="alreadyInCart(cart, product) && user">Item Added</span>
            <span v-else>Add to Cart</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Product } from '../utils/product.interface';
  import { useCart } from '../composables/state';

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
  const alreadyInCart = (cartState: Product[], productToCheck: Product) => {
    return cartState.some((productInCart: Product) => {
      return productInCart.id === productToCheck.id;
    });
  };

  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const addToCart = (product: Product) => {
    if (user.value) {
      cart.value.push(product);
    } else {
      alert('Log in to start adding products to cart');
    }
  };
</script>
