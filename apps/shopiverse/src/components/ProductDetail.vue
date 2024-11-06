<template>
  <div>
    <!-- <Loading v-if="pending" /> -->
    <ProductComp
      :product="product"
      v-bind="product"
    />
  </div>
</template>

<script setup lang="ts">
  import { Product } from '../utils/product.interface';

  const route = useRoute();
  const id = route.params.id;
  const res = await $fetch<{ data: Product }>(
    `/api/products/find-product-by-id/${id}`
  );
  const product = res.data;
</script>
