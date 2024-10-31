import { defineStore } from 'pinia';
import { Movie, TMDBResponse } from './../utils/movie.interface';

export const useNowPlayingStore = defineStore('now-playing', () => {
  // State
  const nowPlayingMovies = ref<Movie[]>([]);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Actions
  async function fetchNowPlayingMovies() {
    isLoading.value = true;
    error.value = null;

    try {
      const data = await $fetch<{
        nowPlayingMovies: TMDBResponse<Movie>;
      }>('api/movie/now-playing');
      if (data) {
        nowPlayingMovies.value = data.nowPlayingMovies.results;
      }
    } catch (err) {
      error.value = 'Failed to fetch movies';
      console.error('Error fetching movies:', err);
    } finally {
      isLoading.value = false;
    }
  }

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
    // Actions
    fetchNowPlayingMovies,
    // Getters
    sortedNowPlayingMovies
  };
});
