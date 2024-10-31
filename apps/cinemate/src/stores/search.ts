import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { Movie, Series, TMDBResponse } from '../utils/movie.interface'

export const useSearchStore = defineStore('search', () => {
  // State
  const movies = ref<Movie[]>([])
  const series = ref<Series[]>([])
  const searchTerm = ref('')
  const isLoading = ref(false)
  const error = ref<string | null>(null)

  // Getters
  const hasResults = computed(() =>
    movies.value.length > 0 || series.value.length > 0
  )

  const totalResults = computed(() =>
    movies.value.length + series.value.length
  )

  // Actions
  async function searchContent(term: string) {
    if (!term.trim()) {
      resetSearch()
      return
    }

    isLoading.value = true
    error.value = null
    searchTerm.value = term

    try {
      const data = await $fetch<{
        movies: TMDBResponse<Movie>
        series: TMDBResponse<Series>
      }>(`api/movie/search`, {
        params: {
          searchTerm: term
        }
      })

      if (data) {
        movies.value = data.movies.results || []
        series.value = data.series.results || []
      }
    } catch (err) {
      error.value = 'Failed to fetch search results'
      console.error('Search error:', err)
    } finally {
      isLoading.value = false
    }
  }

  function resetSearch() {
    movies.value = []
    series.value = []
    searchTerm.value = ''
    error.value = null
  }

  return {
    // State
    movies,
    series,
    searchTerm,
    isLoading,
    error,
    // Getters
    hasResults,
    totalResults,
    // Actions
    searchContent,
    resetSearch
  }
})
