<template>
  <div>
    <section>
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900
          md:text-5xl lg:text-6xl dark:text-white"
      >
        Now Playing Movies
      </h1>

      <ul class="gap grid grid-cols-5">
        <li
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
            :original_language="mov.original_language"
            :adult="mov.adult"
            :vote_average="mov.vote_average"
            :vote_count="mov.vote_count"
            :video="mov.video"
            :genre_ids="mov.genre_ids"
            :original_title="mov.original_title"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
  import { useNowPlayingStore } from '../stores/now-playing';
  import { Movie } from '../utils/movie.interface';
  import { ref, Ref, onMounted } from 'vue';

  const nowPlayingStore = useNowPlayingStore();
  const movies: Ref<Movie[]> = ref([]);
  onMounted(async () => {
    await nowPlayingStore.fetchNowPlayingMovies();
    movies.value = nowPlayingStore.nowPlayingMovies;
  });
</script>
