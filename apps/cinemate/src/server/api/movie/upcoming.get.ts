import { createError, defineEventHandler } from 'h3';
import { Movie, TMDBResponse } from '../../../utils/movie.interface';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || '1';
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?page=${page}`;
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
      message: String(error)
    });
  }
});
