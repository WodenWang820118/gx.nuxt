<template>
  <div>
    <section>
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Popular Movies
      </h1>

      <ul v-if="movies.length" class="grid grid-cols-5 gap">
        <li v-for="mov in movies" :key="mov.id">
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
        </li>
        <br /><br />
      </ul>
    </section>
    <section>
      <h1
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Popular Tv Series
      </h1>

      <ul v-if="series.length" class="grid grid-cols-5 gap">
        <li v-for="tvSeries in series" :key="tvSeries.id">
          <SeriesCard
            :id="tvSeries.id"
            :poster_path="tvSeries.poster_path"
            :name="tvSeries.name"
            :overview="tvSeries.overview"
            :first_air_date="tvSeries.first_air_date"
            :popularity="tvSeries.popularity"
            :item="tvSeries"
            :original_language="tvSeries.original_language"
            :adult="tvSeries.adult"
            :vote_average="tvSeries.vote_average"
            :vote_count="tvSeries.vote_count"
            :genre_ids="tvSeries.genre_ids"
            :original_name="tvSeries.original_name"
          />
        </li>
      </ul>
    </section>
  </div>
</template>

<script setup lang="ts">
import { usePopularStore } from '../stores/popular';
import { Series, Movie } from '../utils/movie.interface';
import { onMounted } from 'vue';

const popularStore = usePopularStore();
const movies: Ref<Movie[]> = ref<Movie[]>([]);
const series: Ref<Series[]> = ref<Series[]>([]);

onMounted(async () => {
  await popularStore.fetchPopularContent();
  movies.value = popularStore.popularMovies;
  series.value = popularStore.popularSeries;
});
</script>
