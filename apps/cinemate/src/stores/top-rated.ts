import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Movie, Series } from './../utils/movie.interface';
import { PaginationState } from './../utils/pagination.interface';

export const useTopRatedStore = defineStore('top-rated', () => {
  // State
  const movies = ref<Movie[]>([]);
  const moviePagination = ref<PaginationState>({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    pageSize: 10
  });
  const series = ref<Series[]>([]);
  const seriesPagination = ref<PaginationState>({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    pageSize: 10
  });
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
  const fetchTopRatedMovies = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        topRatedMovies: TMDBResponse<Movie>;
      }>('api/movie/top-rated', {
        params: { page: page.toString() }
      });

      if (data) {
        movies.value = data.topRatedMovies.results || [];
        moviePagination.value = {
          currentPage: page,
          totalPages: data.topRatedMovies.total_pages,
          totalResults: data.topRatedMovies.total_results,
          pageSize: 10
        };
      }
    } catch (err) {
      error.value = 'Failed to fetch top rated content';
      console.error('Error fetching top rated content:', err);
    } finally {
      isLoading.value = false;
    }
  };

  const fetchTopRatedSeries = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        topRatedSeries: TMDBResponse<Series>;
      }>('api/series/top-rated', {
        params: { page: page.toString() }
      });

      if (data) {
        series.value = data.topRatedSeries.results || [];
        seriesPagination.value = {
          currentPage: page,
          totalPages: data.topRatedSeries.total_pages,
          totalResults: data.topRatedSeries.total_results,
          pageSize: 10
        };
      }
    } catch (err) {
      error.value = 'Failed to fetch top rated series';
      console.error('Error fetching top rated series:', err);
    } finally {
      isLoading.value = false;
    }
  };

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
    moviePagination,
    seriesPagination,
    // Getters
    topMovies,
    topSeries,
    hasContent,
    // Actions
    fetchTopRatedMovies,
    fetchTopRatedSeries,
    resetState
  };
});
