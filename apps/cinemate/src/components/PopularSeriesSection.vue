<template>
  <section class="mb-12">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900
        md:text-5xl lg:text-6xl dark:text-white"
    >
      Popular Series
    </h1>

    <div
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5"
    >
      <div
        v-for="mov in series"
        :key="mov.id"
      >
        <SeriesCard
          v-bind="mov"
          :item="mov"
        />
      </div>
    </div>

    <div class="mt-8 flex justify-center">
      <UPagination
        v-model="seriesPagination.currentPage"
        :total="seriesPagination.totalPages"
        :page-count="seriesPagination.pageSize"
        :ui="{ wrapper: 'justify-center' }"
        :active-button="{ variant: 'solid', color: 'primary' }"
        :inactive-button="{ variant: 'outline', color: 'gray' }"
        show-first
        show-last
        @update:model-value="handleSeriesPageChange"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
  import { usePopularStore } from '../stores/popular';
  import { Series } from '../utils/movie.interface';
  import { ref, Ref, onMounted, watch } from 'vue';
  import { PaginationState } from '../utils/pagination.interface';

  const popularStore = usePopularStore();
  const series: Ref<Series[]> = ref<Series[]>([]);

  const seriesPagination = ref<PaginationState>({
    currentPage: 1,
    totalResults: 0,
    totalPages: 0,
    pageSize: 10
  });

  // Methods
  const handleSeriesPageChange = async (page: number) => {
    await popularStore.fetchPopularSeries(page);
  };

  // Watch for store changes
  watch(
    () => popularStore.popularSeries,
    (newSeries) => {
      series.value = newSeries;
    },
    { deep: true }
  );

  watch(
    () => popularStore.seriesPagination,
    (newPagination) => {
      seriesPagination.value = newPagination;
    },
    { deep: true }
  );

  onMounted(async () => {
    await popularStore.fetchPopularSeries();
  });
</script>
