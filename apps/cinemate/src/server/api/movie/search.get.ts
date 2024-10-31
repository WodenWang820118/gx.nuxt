import { createError, defineEventHandler, getQuery } from "h3"
import { Movie, TMDBResponse } from "../../../utils/movie.interface"

export default defineEventHandler(async event => {
  try {
    const { searchTerm } = getQuery(event)
    const AccessToken = process.env.NUXT_ACCESS_TOKEN
    const movieSearchUrl = 'https://api.themoviedb.org/3/search/movie'
    const seriesSearchUrl = 'https://api.themoviedb.org/3/search/tv'

    // Create URLs with query parameters
    const movieUrl = `${movieSearchUrl}?query=${encodeURIComponent(searchTerm as string)}`
    const seriesUrl = `${seriesSearchUrl}?query=${encodeURIComponent(searchTerm as string)}`
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    }

    const moviesResponse = await fetch(movieUrl, fetchOptions)
    const seriesResponse = await fetch(seriesUrl, fetchOptions)
    const movies = await moviesResponse.json() as TMDBResponse<Movie>
    const series = await seriesResponse.json() as TMDBResponse<Movie>

    return { movies, series }
  } catch (error) {
    createError({
      statusCode: 500,
      message: error
    })
  }
})
