import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Movie, Series } from './../utils/movie.interface';

export const useTopRatedStore = defineStore('top-rated', () => {
  // State
  const movies = ref<Movie[]>([]);
  const series = ref<Series[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const topMovies = computed(() =>
    [...movies.value].sort((a, b) => b.popularity - a.popularity)
  );

  const topSeries = computed(() =>
    [...series.value].sort((a, b) => b.popularity - a.popularity)
  );

  const hasContent = computed(
    () => movies.value.length > 0 || series.value.length > 0
  );

  // Actions
  async function fetchTopRated() {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        topRatedMovies: TMDBResponse<Movie>;
        topRatedSeries: TMDBResponse<Series>;
      }>('api/movie/top-rated');

      if (data) {
        movies.value = data.topRatedMovies.results || [];
        series.value = data.topRatedSeries.results || [];
      }
    } catch (err) {
      error.value = 'Failed to fetch top rated content';
      console.error('Error fetching top rated content:', err);
    } finally {
      isLoading.value = false;
    }
  }

  function resetState() {
    movies.value = [];
    series.value = [];
    error.value = null;
  }

  return {
    // State
    movies,
    series,
    isLoading,
    error,
    // Getters
    topMovies,
    topSeries,
    hasContent,
    // Actions
    fetchTopRated,
    resetState
  };
});
