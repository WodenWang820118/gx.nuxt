<template>
  <section class="mb-12">
    <div
      ref="titleRef"
      class="title"
    >
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900
          md:text-5xl lg:text-6xl dark:text-white"
      >
        Top Rated TV Series
      </h1>
    </div>

    <div
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5"
    >
      <div
        v-for="tvSeries in series"
        :key="tvSeries.id"
      >
        <SeriesCard
          v-bind="tvSeries"
          :item="tvSeries"
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
  import { useTopRatedStore } from '../stores/top-rated';
  import { Series } from '../utils/movie.interface';
  import { ref, onMounted, watch } from 'vue';
  import { PaginationState } from '../utils/pagination.interface';

  const series = ref<Series[]>([]);
  const topRatedStore = useTopRatedStore();
  const titleRef = ref<HTMLElement | null>(null);
  const seriesPagination = ref<PaginationState>({
    currentPage: 1,
    totalResults: 0,
    totalPages: 0,
    pageSize: 10
  });

  // Methods
  const scrollToTitle = () => {
    if (titleRef.value && series.value.length) {
      titleRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleSeriesPageChange = async (page: number) => {
    console.log('Series Page to:', page);
    await topRatedStore.fetchTopRatedSeries(page);
    scrollToTitle();
  };

  // Watch for store changes
  watch(
    () => topRatedStore.topSeries,
    (newSeries) => {
      series.value = newSeries;
    },
    { deep: true }
  );

  watch(
    () => topRatedStore.seriesPagination,
    (newPagination) => {
      seriesPagination.value = newPagination;
    },
    { deep: true }
  );

  onMounted(async () => {
    await topRatedStore.fetchTopRatedSeries();
    series.value = topRatedStore.topSeries;
  });
</script>
