<template>
  <UContainer>
    <!-- Search Section -->
    <div class="py-4">
      <form class="mx-auto max-w-md">
        <label
          for="default-search"
          class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
        >
          Search
        </label>
        <div class="relative">
          <div
            class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"
          >
            <svg
              class="h-4 w-4 text-gray-500 dark:text-gray-400"
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
            id="default-search"
            v-model="searchTerm"
            type="text"
            class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm
              text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600
              dark:bg-gray-700 dark:text-white dark:placeholder-gray-400
              dark:focus:border-blue-500 dark:focus:ring-blue-500"
            placeholder="Search Movies, Series..."
            required
          />
        </div>
      </form>
    </div>

    <!-- Movies Section -->
    <section class="py-8">
      <UContainer v-if="movies.length">
        <h1
          class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900
            md:text-5xl lg:text-6xl dark:text-white"
        >
          Movie Results
        </h1>

        <ul
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            xl:grid-cols-5"
        >
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
        </ul>
      </UContainer>
    </section>

    <!-- TV Series Section -->
    <section class="py-8">
      <UContainer v-if="series.length">
        <h1
          class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900
            md:text-5xl lg:text-6xl dark:text-white"
        >
          Tv Series Results
        </h1>

        <ul
          class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4
            xl:grid-cols-5"
        >
          <li
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
          </li>
        </ul>
      </UContainer>
    </section>
  </UContainer>
</template>

<script setup lang="ts">
  import { useSearchStore } from '../stores/search';
  import { Movie, Series } from '../utils/movie.interface';
  import { ref, Ref, watch } from 'vue';

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
