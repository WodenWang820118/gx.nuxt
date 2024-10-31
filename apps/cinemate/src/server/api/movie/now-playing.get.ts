import { createError, defineEventHandler } from "h3"
import { Movie, TMDBResponse } from "../../../utils/movie.interface"

export default defineEventHandler(async () => {
  try {
    const AccessToken = process.env.NUXT_ACCESS_TOKEN
    const nowPlayingUrl = 'https://api.themoviedb.org/3/movie/now_playing'
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    }
    const nowPlayingMoviesResponse = await fetch(nowPlayingUrl, fetchOptions)
    const nowPlayingMovies = await nowPlayingMoviesResponse.json() as TMDBResponse<Movie>
    return { nowPlayingMovies }
  } catch (error) {
    createError({
      statusCode: 500,
      message: error
    })
  }
})
