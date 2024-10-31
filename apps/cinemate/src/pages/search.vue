<template>
  <div>
    <form class="max-w-md mx-auto">
      <label
        for="default-search"
        class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
        >Search</label
      >
      <div class="relative">
        <div
          class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none"
        >
          <svg
            class="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>
        <input
          v-model="searchTerm"
          type="text"
          id="default-search"
          class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder="Search Movies, Series..."
          required
        />
      </div>
    </form>

    <section>
      <h1
        v-if="movies.length"
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Movie Results
      </h1>

      <ul class="grid grid-cols-5 gap">
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
        v-if="series.length"
        class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"
      >
        Tv Series Results
      </h1>

      <ul class="grid grid-cols-5 gap">
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
import { useSearchStore } from '../stores/search';

const searchTerm = ref('');
const movies: Ref<Movie[]> = ref([]);
const series: Ref<Series[]> = ref([]);
const searchStore = useSearchStore();

watch(searchTerm, async (newSearchTerm) => {
  await searchStore.searchContent(newSearchTerm);
  movies.value = searchStore.movies;
  series.value = searchStore.series;
});
</script>
