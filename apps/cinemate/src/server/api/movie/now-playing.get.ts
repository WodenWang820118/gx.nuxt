import { createError, defineEventHandler } from 'h3';
import { Movie, TMDBResponse } from '../../../utils/movie.interface';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || '1';
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?page=${page}`;
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const nowPlayingMoviesResponse = await fetch(nowPlayingUrl, fetchOptions);
    const nowPlayingMovies =
      (await nowPlayingMoviesResponse.json()) as TMDBResponse<Movie>;
    return { nowPlayingMovies };
  } catch (error) {
    createError({
      statusCode: 500,
      message: String(error)
    });
  }
});
