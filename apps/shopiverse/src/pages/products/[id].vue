<template>
  <ProductDetail
    v-if="product"
    v-bind="product"
    :product="product"
  />
  <div
    v-else
    class="flex min-h-[400px] items-center justify-center"
  >
    <div class="flex flex-col items-center gap-4">
      <div
        class="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-blue-500"
      ></div>
      <p class="text-lg font-medium text-gray-500">Loading product...</p>
    </div>
  </div>
</template>
<script setup lang="ts">
  import { Product } from '../../utils/product.interface';

  // Get route parameters
  const route = useRoute();
  const id = route.params.id;
  const product = ref<Product>(null);

  onMounted(async () => {
    const res = await $fetch<Product>(`/api/products/find-product-by-id/${id}`);
    product.value = res;
  });
</script>
