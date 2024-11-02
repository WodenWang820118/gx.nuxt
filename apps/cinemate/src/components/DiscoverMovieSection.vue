<template>
  <section class="mb-12">
    <!-- Added margin bottom for section spacing -->
    <h1
      class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900
        md:text-5xl lg:text-6xl dark:text-white"
    >
      Featured Movies
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
  </section>
</template>

<script setup lang="ts">
  import { useDiscoverStore } from '../stores/discover';
  import { Movie } from '../utils/movie.interface';
  import { ref, Ref, onMounted } from 'vue';

  const discoverStore = useDiscoverStore();
  const movies: Ref<Movie[]> = ref<Movie[]>([]);

  onMounted(async () => {
    await discoverStore.fetchMovies();
    movies.value = discoverStore.movies;
  });
</script>
