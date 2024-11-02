<template>
  <section class="mb-12">
    <!-- Added margin bottom for section spacing -->
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900
        md:text-5xl lg:text-6xl dark:text-white"
    >
      Upcoming Movies
    </h1>

    <div
      class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
        xl:grid-cols-5"
    >
      <div
        v-for="mov in movies"
        :key="mov.id"
      >
        <MovieCard
          v-bind="mov"
          :item="mov"
        />
      </div>
    </div>
    <div class="mt-8 flex justify-center">
      <UPagination
        v-model="moviePagination.currentPage"
        :total="moviePagination.totalPages"
        :page-count="moviePagination.pageSize"
        :ui="{ wrapper: 'justify-center' }"
        :active-button="{ variant: 'solid', color: 'primary' }"
        :inactive-button="{ variant: 'outline', color: 'gray' }"
        show-first
        show-last
        @update:model-value="handleMoviePageChange"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
  import { useUpcomingStore } from '../stores/upcoming';
  import { Movie } from '../utils/movie.interface';
  import { ref, Ref, onMounted } from 'vue';

  const movies: Ref<Movie[]> = ref([]);
  const upcomingStore = useUpcomingStore();
  const moviePagination = ref<PaginationState>({
    currentPage: 1,
    totalResults: 0,
    totalPages: 0,
    pageSize: 10
  });

  // Methods
  const handleMoviePageChange = async (page: number) => {
    console.log('Movie Page to:', page);
    await upcomingStore.fetchUpcomingMovies(page);
  };

  // Watch for store changes
  watch(
    () => upcomingStore.upcomingMovies,
    (newMovies) => {
      movies.value = newMovies;
    },
    { deep: true }
  );

  watch(
    () => upcomingStore.moviePagination,
    (newPagination) => {
      moviePagination.value = newPagination;
    },
    { deep: true }
  );
  onMounted(async () => {
    await upcomingStore.fetchUpcomingMovies();
    movies.value = upcomingStore.upcomingMovies;
  });
</script>
