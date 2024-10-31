import { defineStore } from 'pinia'
import { Movie, Series } from '../utils/movie.interface'

export const usePopularStore = defineStore('popular', () => {
  // State
  const popularMovies = ref<Movie[]>([]);
  const popularSeries = ref<Series[]>([]);
  const isLoading = ref(false)
  const error = ref(null)

  // Actions
  const fetchPopularContent = async () => {
    isLoading.value = true
    error.value = null

    try {
      const data = await $fetch<{
        popularMovies: TMDBResponse<Movie>
        popularSeries: TMDBResponse<Series>
      }>('api/movie/popular')

      if (data) {
        popularMovies.value = data.popularMovies.results
        popularSeries.value = data.popularSeries.results
      }
    } catch (err) {
      error.value = err.message || 'Failed to fetch popular content'
    } finally {
      isLoading.value = false
    }
  }

  // Getters (computed)
  const hasError = computed(() => error.value !== null)
  const isContentLoaded = computed(() =>
    popularMovies.value !== null && popularSeries.value !== null
  )

  return {
    // State
    popularMovies,
    popularSeries,
    isLoading,
    error,

    // Actions
    fetchPopularContent,

    // Getters
    hasError,
    isContentLoaded
  }
})
