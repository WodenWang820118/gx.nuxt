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
        Now Playing Movies
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
  import { useNowPlayingStore } from '../stores/now-playing';
  import { Movie } from '../utils/movie.interface';
  import { ref, Ref, onMounted, watch } from 'vue';
  import { PaginationState } from '../utils/pagination.interface';

  const nowPlayingStore = useNowPlayingStore();
  const movies: Ref<Movie[]> = ref([]);
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
    await nowPlayingStore.fetchNowPlayingMovies(page);
    scrollToTitle();
  };

  // Watch for store changes
  watch(
    () => nowPlayingStore.nowPlayingMovies,
    (newMovies) => {
      movies.value = newMovies;
    },
    { deep: true }
  );

  watch(
    () => nowPlayingStore.moviePagination,
    (newPagination) => {
      moviePagination.value = newPagination;
    },
    { deep: true }
  );
  onMounted(async () => {
    await nowPlayingStore.fetchNowPlayingMovies();
    movies.value = nowPlayingStore.nowPlayingMovies;
  });
</script>
