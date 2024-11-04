<template>
  <div>
    <Loading v-if="pending" />
    <ProductComp
      v-else
      :product="product"
      v-bind="product"
    />
  </div>
</template>

<script setup lang="ts">
  import { Product } from '../utils/product.interface';

  const route = useRoute();
  const id = route.params.id;
  const { data: product, pending } = await useFetch<Product>(
    () => {
      return `/api/products/find-product-by-id/${id}`;
    },
    {
      lazy: true
    }
  );
</script>
