<template>
  <div :id="`productcomp${product.id}`">
    <div
      class="w-full max-w-sm rounded-lg border border-gray-200 bg-white shadow
        dark:border-gray-700 dark:bg-gray-800"
    >
      <NuxtLink :to="`product-${product.id}`">
        <img
          class="rounded-t-lg p-8"
          :src="`${product.image}`"
          alt="product image"
        />
      </NuxtLink>
      <div class="px-5 pb-5">
        <NuxtLink :to="`product-${product.id}`">
          <h5
            class="text-xl font-semibold tracking-tight text-gray-900 dark:text-white"
            >{{ product.title }}</h5
          >
        </NuxtLink>
        <NuxtLink :to="`product-${product.id}`">
          <p class="mb-3 truncate text-gray-500 dark:text-gray-400">{{
            product.description
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
            product.price
          }}</span>

          <span
            class="text-3xl font-bold text-gray-900 line-through dark:text-white"
            >{{ product.price * 2 }}</span
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

<script setup>
  defineProps(['product']);

  const user = useSupabaseUser();
  const cart = useCart();
  const alreadyInCart = (cartState, productToCheck) => {
    return cartState.some((productInCart) => {
      return productInCart.id === productToCheck.id;
    });
  };

  const getRandomRating = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  const addToCart = (product) => {
    if (user.value) {
      cart.value.push(product);
    } else {
      alert('Log in to start adding products to cart');
    }
  };
</script>
