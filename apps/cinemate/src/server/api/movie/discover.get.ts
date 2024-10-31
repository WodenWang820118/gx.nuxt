import { Movie, Series, TMDBResponse } from '../../../utils/movie.interface';
import { createError, defineEventHandler } from "h3"

export default defineEventHandler(async () => {
  try {
    const AccessToken = process.env.NUXT_ACCESS_TOKEN
    const movieUrl = 'https://api.themoviedb.org/3/discover/movie'
    const seriesUrl = 'https://api.themoviedb.org/3/discover/tv'
    // Fetch options
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    }
    const moviesResponse = await fetch(movieUrl, fetchOptions);
    const seriesResponse = await fetch(seriesUrl, fetchOptions);
    const movies = await moviesResponse.json() as TMDBResponse<Movie>
    const series = await seriesResponse.json() as TMDBResponse<Series>

    return { movies, series }
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: error
    })
  }
})
