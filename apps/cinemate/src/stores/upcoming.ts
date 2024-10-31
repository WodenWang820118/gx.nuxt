import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { Movie } from '../utils/movie.interface';

export const useUpcomingStore = defineStore('upcoming', () => {
  // State
  const upcomingMovies = ref<Movie[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const sortedByDate = computed(() => {
    return [...upcomingMovies.value].sort(
      (a, b) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  });

  const totalMovies = computed(() => upcomingMovies.value.length);

  // Actions
  async function fetchUpcomingMovies() {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        upcomingMovies: TMDBResponse<Movie>;
      }>('api/movie/upcoming');
      if (data) {
        upcomingMovies.value = data.upcomingMovies.results || [];
      }
    } catch (err) {
      error.value = 'Failed to fetch upcoming movies';
      console.error('Error fetching upcoming movies:', err);
    } finally {
      isLoading.value = false;
    }
  }

  function resetState() {
    upcomingMovies.value = [];
    error.value = null;
  }

  return {
    // State
    upcomingMovies,
    isLoading,
    error,
    // Getters
    sortedByDate,
    totalMovies,
    // Actions
    fetchUpcomingMovies,
    resetState
  };
});
