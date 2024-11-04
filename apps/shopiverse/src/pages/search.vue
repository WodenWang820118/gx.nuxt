<template>
  <div>
    <form class="mx-auto flex max-w-sm items-center">
      <label
        for="simple-search"
        class="sr-only"
        >Search</label
      >
      <div class="relative w-full">
        <div
          class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
        >
          <svg
            class="h-4 w-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 18 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
            />
          </svg>
        </div>
        <input
          id="simple-search"
          v-model="searchInput"
          type="text"
          class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 ps-10 text-sm
            text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
            dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
            dark:focus:border-blue-500 dark:focus:ring-blue-500"
          placeholder="Search for any product..."
          required
        />
      </div>
    </form>

    <br /><br />

    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="product in searchResults"
        v-if="searchResults && searchInput"
        :key="product.id"
      >
        <ProductComp
          :product="product"
          v-bind="product"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { Product } from '../utils/product.interface';

  const searchInput = useState<string>(() => null);
  const searchResults = useState<Product[]>(() => null);
  const { data } = await useFetch<Product[]>('/api/products/search/query', {
    immediate: false,
    query: {
      input: searchInput
    },
    transform: (data) => {
      return data.map((item) => ({
        id: item.id,
        title: item.title,
        category: item.category,
        description: item.description,
        image: item.image,
        price: item.price,
        created_at: item.created_at
      }));
    }
  });
</script>
