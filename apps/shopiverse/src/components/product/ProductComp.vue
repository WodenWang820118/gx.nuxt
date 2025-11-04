<template>
  <UCard
    :id="`productcomp${id}`"
    class="flex h-full flex-col"
  >
    <!-- Card Header with Image -->
    <template #header>
      <NuxtLink :to="`/products/${id}`">
        <img
          class="h-48 w-full rounded-t-lg object-cover"
          :src="image || '/images/place-holder.png'"
          alt="product"
        />
      </NuxtLink>
    </template>

    <!-- Card Body -->
    <template #default>
      <div class="flex flex-1 flex-col">
        <NuxtLink :to="`/products/${id}`">
          <h5 class="line-clamp-2 h-14 text-xl font-semibold">{{ title }}</h5>
        </NuxtLink>
        <NuxtLink :to="`/products/${id}`">
          <p class="mb-3 line-clamp-2 h-12 text-gray-500">{{ description }}</p>
        </NuxtLink>
        <div class="mb-5 mt-2.5 flex items-center">
          <h5>Rating: </h5>
          <span
            class="ms-3 rounded bg-blue-100 px-2.5 py-0.5 text-xs font-semibold text-blue-800"
          >
            {{ getRandomRating() }}
          </span>
        </div>
      </div>
    </template>

    <!-- Card Footer -->
    <template #footer>
      <div class="flex min-h-[6rem] flex-col justify-end gap-3">
        <div class="flex flex-wrap items-baseline gap-2">
          <span class="text-2xl font-bold text-gray-900 dark:text-white">{{
            formatPrice(price)
          }}</span>
          <span
            class="text-lg font-medium text-gray-500 line-through dark:text-gray-400"
          >
            {{ formatPrice(price * 2) }}
          </span>
          <span
            class="rounded bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800"
          >
            50% OFF
          </span>
        </div>
        <UButton
          color="primary"
          size="sm"
          block
          @click="
            addToCart({
              ...product,
              quantity: 1
            })
          "
        >
          <span v-if="alreadyInCart(product)">Item Added</span>
          <span v-else>Add to Cart</span>
        </UButton>
      </div>
    </template>
  </UCard>
</template>

<script setup lang="ts">
  import { Product } from '../../utils/product.interface';
  import { useProductLogic } from './product.script';
  import { formatPrice } from '../../utils/format';

  defineProps<{
    id: string;
    title: string;
    category: string;
    description: string;
    price: number;
    image: string;
    product: Product;
  }>();

  const { addToCart, alreadyInCart, getRandomRating } = useProductLogic();
</script>
