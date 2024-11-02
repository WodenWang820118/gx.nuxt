<template>
  <UContainer>
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
        </div>
      </div>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
  import { useDiscoverStore } from '../stores/discover';
  import { Movie, Series } from '../utils/movie.interface';
  import { ref, Ref, onMounted } from 'vue';

  const discoverStore = useDiscoverStore();
  const movies: Ref<Movie[]> = ref<Movie[]>([]);
  const series: Ref<Series[]> = ref<Series[]>([]);

  onMounted(async () => {
    await discoverStore.fetchMoviesAndSeries();
    movies.value = discoverStore.movies;
    series.value = discoverStore.series;
  });
</script>
