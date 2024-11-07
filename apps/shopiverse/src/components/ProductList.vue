<template>
  <div class="grid grid-cols-4 gap-4">
    <div
      v-for="product in products"
      v-if="products"
      :key="product.id"
    >
      <ProductComp
        :product="product"
        v-bind="product"
      />
    </div>
    <div v-else>
      <p>No products</p>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Product } from '../utils/product.interface';
  const products = ref<Product[]>([]);

  onMounted(async () => {
    const res = await $fetch<Product[]>('/api/products');
    products.value = res;
  });
</script>
