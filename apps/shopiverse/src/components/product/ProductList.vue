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
    <template v-if="filteredProducts.length">
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
          v-for="product in filteredProducts"
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

      <!-- Pagination Controls -->
      <div
        v-if="pagination"
        class="mt-8 flex items-center justify-center gap-4"
      >
        <UButton
          :disabled="currentPage === 1"
          @click="changePage(currentPage - 1)"
        >
          Previous
        </UButton>

        <div class="flex gap-2">
          <UButton
            v-for="pageNum in displayedPages"
            :key="pageNum"
            :variant="pageNum === currentPage ? 'solid' : 'outline'"
            @click="changePage(pageNum)"
          >
            {{ pageNum }}
          </UButton>
        </div>

        <UButton
          :disabled="currentPage === pagination.totalPages"
          @click="changePage(currentPage + 1)"
        >
          Next
        </UButton>
      </div>

      <!-- Pagination Info -->
      <div
        v-if="pagination"
        class="mt-4 text-center text-sm text-gray-600"
      >
        Showing {{ (currentPage - 1) * pagination.limit + 1 }} to
        {{ Math.min(currentPage * pagination.limit, pagination.total) }} of
        {{ pagination.total }} products
      </div>
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
  const currentPage = ref(1);
  const pagination = ref<{
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  } | null>(null);

  // Fetch products with error handling
  async function fetchProducts(page = 1) {
    try {
      pending.value = true;
      const res = await $fetch<{
        products: Product[];
        pagination: {
          page: number;
          limit: number;
          total: number;
          totalPages: number;
        };
      }>(`/api/products?page=${page}&limit=12`);
      products.value = res.products;
      pagination.value = res.pagination;
      currentPage.value = page;
    } catch (err) {
      error.value = err as Error;
    } finally {
      pending.value = false;
    }
  }

  // Change page
  function changePage(page: number) {
    if (pagination.value && page >= 1 && page <= pagination.value.totalPages) {
      fetchProducts(page);
      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  // Computed property for displayed page numbers
  const displayedPages = computed(() => {
    if (!pagination.value) return [];

    const { page, totalPages } = pagination.value;
    const pages: number[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      // Show all pages if total is less than max
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show pages around current page
      let start = Math.max(1, page - 2);
      const end = Math.min(totalPages, start + maxVisible - 1);

      // Adjust start if we're near the end
      if (end - start < maxVisible - 1) {
        start = Math.max(1, end - maxVisible + 1);
      }

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }
    }

    return pages;
  });

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
