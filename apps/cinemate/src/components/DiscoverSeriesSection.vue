<template>
  <section class="mb-12">
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900
        md:text-5xl lg:text-6xl dark:text-white"
    >
      Featured Tv Series
    </h1>

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
  </section>
</template>

<script setup lang="ts">
  import { useDiscoverStore } from '../stores/discover';
  import { Series } from '../utils/movie.interface';
  import { ref, Ref, onMounted } from 'vue';

  const discoverStore = useDiscoverStore();
  const series: Ref<Series[]> = ref<Series[]>([]);

  onMounted(async () => {
    await discoverStore.fetchSeries();
    series.value = discoverStore.series;
  });
</script>
