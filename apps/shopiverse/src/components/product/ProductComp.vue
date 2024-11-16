<template>
  <UCard :id="`productcomp${id}`">
    <!-- Card Header with Image -->
    <template #header>
      <NuxtLink :to="`/products/${id}`">
        <img
          class="w-full rounded-t-lg object-cover"
          :src="image || '/images/placeholder.png'"
          alt="product image"
        />
      </NuxtLink>
    </template>

    <!-- Card Body -->
    <template #default>
      <NuxtLink :to="`/products/${id}`">
        <h5 class="text-xl font-semibold">{{ title }}</h5>
      </NuxtLink>
      <NuxtLink :to="`/products/${id}`">
        <p class="mb-3 truncate text-gray-500">{{ description }}</p>
      </NuxtLink>
      <div class="mb-5 mt-2.5 flex items-center">
        <h5>Rating: </h5>
        <span
          class="ms-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800"
        >
          {{ getRandomRating() }}
        </span>
      </div>
    </template>

    <!-- Card Footer -->
    <template #footer>
      <div class="flex items-center justify-between">
        <span class="text-3xl font-bold">{{ price + 100 }}</span>
        <span class="text-3xl font-bold line-through">
          {{ (price + 100) * 2 }}
        </span>
        <UButton
          color="primary"
          @click="
            addToCart({
              ...product,
              quantity: 1
            })
          "
        >
          <span v-if="alreadyInCart(product) && user">Item Added</span>
          <span v-else>Add to Cart</span>
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
  import { Product } from '../../utils/product.interface';
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
  const { addToCart, alreadyInCart, getRandomRating } = useProductLogic();
</script>
