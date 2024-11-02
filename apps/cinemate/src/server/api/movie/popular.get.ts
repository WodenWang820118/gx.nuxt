import { createError, defineEventHandler } from 'h3';
import { Movie, TMDBResponse } from '../../../utils/movie.interface';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || '1';
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    };

    const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?page=${page}`;
    const popularMoviesResponse = await fetch(popularMoviesUrl, fetchOptions);
    const popularMovies =
      (await popularMoviesResponse.json()) as TMDBResponse<Movie>;

    return { popularMovies };
  } catch (error) {
    createError({
      statusCode: 500,
      message: String(error)
    });
  }
});
