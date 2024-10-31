import { createError, defineEventHandler } from "h3"

export default defineEventHandler(async () => {
  try {
    const AccessToken = process.env.NUXT_ACCESS_TOKEN
    const topRatedMoviesUrl = 'https://api.themoviedb.org/3/movie/top_rated'
    const topRatedSeriesUrl = 'https://api.themoviedb.org/3/tv/top_rated'
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    }
    const topRatedMoviesResponse = await fetch(topRatedMoviesUrl, fetchOptions)
    const topRatedSeriesResponse = await fetch(topRatedSeriesUrl, fetchOptions)
    const topRatedMovies = await topRatedMoviesResponse.json()
    const topRatedSeries = await topRatedSeriesResponse.json()

    return { topRatedMovies, topRatedSeries }
  } catch (error) {
    createError({
      statusCode: 500,
      message: error
    })
  }
})
