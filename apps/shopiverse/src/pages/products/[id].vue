<template>
  <ProductDetail
    v-if="product"
    v-bind="product"
    :product="product"
  />
  <div v-else>
    <Loading />
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
