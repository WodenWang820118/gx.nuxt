<template>
  <UContainer>
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
            :id="mov.id"
            :poster_path="mov.poster_path"
            :title="mov.title"
            :overview="mov.overview"
            :release_date="mov.release_date"
            :popularity="mov.popularity"
            :item="mov"
            :original_language="mov.original_language"
            :adult="mov.adult"
            :vote_average="mov.vote_average"
            :vote_count="mov.vote_count"
            :video="mov.video"
            :genre_ids="mov.genre_ids"
            :original_title="mov.original_title"
          />
        </div>
      </div>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
  import { useUpcomingStore } from '../stores/upcoming';
  import { Movie } from '../utils/movie.interface';
  import { ref, Ref, onMounted } from 'vue';

  const movies: Ref<Movie[]> = ref([]);
  const upcomingStore = useUpcomingStore();
  onMounted(async () => {
    await upcomingStore.fetchUpcomingMovies();
    movies.value = upcomingStore.upcomingMovies;
  });
</script>
