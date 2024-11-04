<template>
  <div>
    <Loading v-if="pending" />
    <ProductComp
      v-else
      :product="product"
    />
  </div>
</template>

<script setup lang="ts">
  const route = useRoute();
  const id = route.params.id;
  const { data: product, pending } = await useFetch(
    () => {
      return `/api/products/find-product-by-id/${id}`;
    },
    {
      lazy: true
    }
  );
</script>
