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
        Top Rated Movies
      </h1>
    </div>

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
  import { useTopRatedStore } from '../stores/top-rated';
  import { Movie } from '../utils/movie.interface';
  import { ref, onMounted, watch } from 'vue';
  import { PaginationState } from '../utils/pagination.interface';

  const movies = ref<Movie[]>([]);
  const topRatedStore = useTopRatedStore();
  const titleRef = ref<HTMLElement | null>(null);
  const moviePagination = ref<PaginationState>({
    currentPage: 1,
    totalResults: 0,
    totalPages: 0,
    pageSize: 10
  });

  // Methods
  const scrollToTitle = () => {
    if (titleRef.value && movies.value.length) {
      titleRef.value.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  };

  const handleMoviePageChange = async (page: number) => {
    console.log('Movie Page to:', page);
    await topRatedStore.fetchTopRatedMovies(page);
    scrollToTitle();
  };

  // Watch for store changes
  watch(
    () => topRatedStore.topMovies,
    (newMovies) => {
      movies.value = newMovies;
    },
    { deep: true }
  );

  watch(
    () => topRatedStore.moviePagination,
    (newPagination) => {
      moviePagination.value = newPagination;
    },
    { deep: true }
  );
  onMounted(async () => {
    await topRatedStore.fetchTopRatedMovies();
    movies.value = topRatedStore.topMovies;
  });
</script>
