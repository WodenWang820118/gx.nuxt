import { defineStore } from 'pinia';
import { Movie, TMDBResponse } from './../utils/movie.interface';
import { ref } from 'vue';

export const useDiscoverStore = defineStore('discover', () => {
  // State
  const movies = ref<Movie[]>([]);
  const series = ref<Series[]>([]);
  const isLoading = ref(false);
  const error = ref(null);

  // Actions
  const fetchMoviesAndSeries = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        movies: TMDBResponse<Movie>;
        series: TMDBResponse<Series>;
      }>('api/movie/discover');
      if (data) {
        movies.value = data ? data.movies.results : [];
        series.value = data ? data.series.results : [];
      }
    } catch (err) {
      error.value = err;
      console.error('Error fetching movies and series:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    movies,
    series,
    isLoading,
    error,
    fetchMoviesAndSeries
  };
});
