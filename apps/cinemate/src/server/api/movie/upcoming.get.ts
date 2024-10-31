import { createError, defineEventHandler } from 'h3';
import { Movie, TMDBResponse } from '../../../utils/movie.interface';

export default defineEventHandler(async () => {
  try {
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const upcomingMoviesUrl = 'https://api.themoviedb.org/3/movie/upcoming';
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const upcomingMoviesResponse = await fetch(upcomingMoviesUrl, fetchOptions);
    const upcomingMovies =
      (await upcomingMoviesResponse.json()) as TMDBResponse<Movie>;
    return { upcomingMovies };
  } catch (error) {
    createError({
      statusCode: 500,
      message: error
    });
  }
});
