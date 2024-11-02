// stores/popular.ts
import { defineStore } from 'pinia';
import { Movie, Series } from '../utils/movie.interface';
import { PaginationState } from '../utils/pagination.interface';

export const usePopularStore = defineStore('popular', () => {
  // State
  const popularMovies = ref<Movie[]>([]);
  const moviePagination = ref<PaginationState>({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    pageSize: 20
  });
  const popularSeries = ref<Series[]>([]);
  const seriesPagination = ref<PaginationState>({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    pageSize: 20
  });
  const isLoading = ref(false);
  const error = ref(null);

  // Actions
  const fetchPopularMovies = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        popularMovies: TMDBResponse<Movie>;
      }>(`api/movie/popular`, {
        params: {
          page: page.toString()
        }
      });

      if (data) {
        popularMovies.value = data.popularMovies.results;
        moviePagination.value = {
          currentPage: page,
          totalPages: data.popularMovies.total_pages,
          totalResults: data.popularMovies.total_results,
          pageSize: 10
        };
      }
    } catch (err) {
      error.value = err.message || 'Failed to fetch popular movies';
    } finally {
      isLoading.value = false;
    }
  };

  const fetchPopularSeries = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        popularSeries: TMDBResponse<Series>;
      }>(`api/series/popular`, {
        params: {
          page: page.toString()
        }
      });

      console.log('Popular Series: ', data);

      if (data) {
        popularSeries.value = data.popularSeries.results;
        seriesPagination.value = {
          currentPage: page,
          totalPages: data.popularSeries.total_pages,
          totalResults: data.popularSeries.total_results,
          pageSize: 10
        };
      }
    } catch (err) {
      error.value = err.message || 'Failed to fetch popular series';
    } finally {
      isLoading.value = false;
    }
  };

  // Getters
  const hasError = computed(() => error.value !== null);
  const isContentLoaded = computed(
    () => popularMovies.value !== null && popularSeries.value !== null
  );

  return {
    popularMovies,
    popularSeries,
    isLoading,
    error,
    moviePagination,
    seriesPagination,
    fetchPopularMovies,
    fetchPopularSeries,
    hasError,
    isContentLoaded
  };
});
