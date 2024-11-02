import { defineStore } from 'pinia';
import { Movie, TMDBResponse } from './../utils/movie.interface';
import { PaginationState } from '../utils/pagination.interface';

export const useNowPlayingStore = defineStore('now-playing', () => {
  // State
  const nowPlayingMovies = ref<Movie[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const moviePagination = ref<PaginationState>({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    pageSize: 10
  });

  // Actions
  const fetchNowPlayingMovies = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        nowPlayingMovies: TMDBResponse<Movie>;
      }>('api/movie/now-playing', {
        params: { page: page.toString() }
      });
      if (data) {
        nowPlayingMovies.value = data.nowPlayingMovies.results;
        moviePagination.value = {
          currentPage: page,
          totalPages: data.nowPlayingMovies.total_pages,
          totalResults: data.nowPlayingMovies.total_results,
          pageSize: 10
        };
      }
    } catch (err) {
      error.value = 'Failed to fetch movies';
      console.error('Error fetching movies:', err);
    } finally {
      isLoading.value = false;
    }
  };

  // Getters
  const sortedNowPlayingMovies = computed(() => {
    return [...nowPlayingMovies.value].sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  });

  return {
    // State
    nowPlayingMovies,
    isLoading,
    error,
    moviePagination,
    // Actions
    fetchNowPlayingMovies,
    // Getters
    sortedNowPlayingMovies
  };
});
