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
  const fetchMovies = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        movies: TMDBResponse<Movie>;
      }>('api/movie/discover');
      if (data) {
        movies.value = data ? data.movies.results : [];
      }
    } catch (err) {
      error.value = err;
      console.error('Error fetching movies and series:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchSeries = async () => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        series: TMDBResponse<Series>;
      }>('api/series/discover');
      if (data) {
        series.value = data ? data.series.results : [];
      }
    } catch (err) {
      error.value = err;
      console.error('Error fetching series:', err);
    } finally {
      isLoading.value = false;
    }
  };

  return {
    movies,
    series,
    isLoading,
    error,
    fetchMovies,
    fetchSeries
  };
});
