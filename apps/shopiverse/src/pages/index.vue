<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="product in products"
      v-if="products"
      :key="product.id"
    >
      <ProductComp :product="product" />
    </div>
  </div>
</template>

<script setup>
  const { data: products } = await useFetch('/api/products');
</script>
