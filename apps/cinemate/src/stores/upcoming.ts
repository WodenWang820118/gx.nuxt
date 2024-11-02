import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Movie } from '../utils/movie.interface';

export const useUpcomingStore = defineStore('upcoming', () => {
  // State
  const upcomingMovies = ref<Movie[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);
  const moviePagination = ref({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    pageSize: 10
  });

  // Getters
  const sortedByDate = computed(() => {
    return [...upcomingMovies.value].sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  });

  const totalMovies = computed(() => upcomingMovies.value.length);

  // Actions
  const fetchUpcomingMovies = async (page = 1) => {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        upcomingMovies: TMDBResponse<Movie>;
      }>('api/movie/upcoming', {
        params: {
          page: page.toString()
        }
      });
      if (data) {
        upcomingMovies.value = data.upcomingMovies.results || [];
        moviePagination.value = {
          currentPage: page,
          totalPages: data.upcomingMovies.total_pages,
          totalResults: data.upcomingMovies.total_results,
          pageSize: 10
        };
      }
    } catch (err) {
      error.value = 'Failed to fetch upcoming movies';
      console.error('Error fetching upcoming movies:', err);
    } finally {
      isLoading.value = false;
    }
  };

  function resetState() {
    upcomingMovies.value = [];
    error.value = null;
  }

  return {
    // State
    upcomingMovies,
    isLoading,
    error,
    moviePagination,
    // Getters
    sortedByDate,
    totalMovies,
    // Actions
    fetchUpcomingMovies,
    resetState
  };
});
