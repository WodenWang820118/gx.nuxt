<template>
  <UContainer>
    <!-- Loading State -->
    <div
      v-if="pending"
      class="flex justify-center py-8"
    >
      <Loading />
    </div>

    <!-- Error State -->
    <UAlert
      v-if="error"
      color="red"
      variant="soft"
      icon="i-heroicons-exclamation-triangle"
    >
      {{ error.message }}
    </UAlert>

    <!-- Products Grid -->
    <template v-if="products.length">
      <!-- Optional: Filter/Sort Controls -->
      <div class="mb-6 flex items-center justify-between">
        <USelect
          v-model="sortBy"
          :options="[
            { label: 'Price: Low to High', value: 'price-asc' },
            { label: 'Price: High to Low', value: 'price-desc' },
            { label: 'Name: A-Z', value: 'name-asc' },
            { label: 'Name: Z-A', value: 'name-desc' }
          ]"
          placeholder="Sort by"
        />
        <UInput
          v-model="searchQuery"
          icon="i-heroicons-magnifying-glass"
          placeholder="Search products..."
          class="max-w-xs"
        />
      </div>

      <!-- Products Grid -->
      <div
        class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4"
      >
        <ProductComp
          v-for="product in products"
          :key="product.id"
          :product="product"
          v-bind="product"
        />
      </div>

      <!-- Empty State -->
      <UAlert
        v-if="filteredProducts.length === 0"
        icon="i-heroicons-information-circle"
        color="red"
        variant="soft"
        class="mt-4"
      >
        No products found matching your criteria
      </UAlert>
    </template>
  </UContainer>
</template>

<script setup lang="ts">
  import { Product } from '../../utils/product.interface';

  // State
  const products = ref<Product[]>([]);
  const pending = ref(false);
  const error = ref<Error | null>(null);
  const sortBy = ref('');
  const searchQuery = ref('');

  // Fetch products with error handling
  async function fetchProducts() {
    try {
      pending.value = true;
      const res = await $fetch<Product[]>('/api/products');
      products.value = res;
    } catch (err) {
      error.value = err as Error;
    } finally {
      pending.value = false;
    }
  }

  // Computed property for filtered and sorted products
  const filteredProducts = computed(() => {
    let result = [...products.value];

    // Apply search filter
    if (searchQuery.value) {
      const query = searchQuery.value.toLowerCase();
      result = result.filter(
        (product) =>
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query)
      );
    }

    // Apply sorting
    switch (sortBy.value) {
      case 'price-asc':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        result.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'name-desc':
        result.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }

    return result;
  });

  // Fetch products on mount
  onMounted(() => {
    fetchProducts();
  });
</script>
