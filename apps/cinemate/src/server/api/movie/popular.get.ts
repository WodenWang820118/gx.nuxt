import { createError, defineEventHandler } from 'h3';
import { Movie, Series, TMDBResponse } from '../../../utils/movie.interface';

export default defineEventHandler(async () => {
  try {
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const popularMoviesUrl = 'https://api.themoviedb.org/3/movie/popular';
    const popularSeriesUrl = 'https://api.themoviedb.org/3/tv/popular';
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const popularMoviesResponse = await fetch(popularMoviesUrl, fetchOptions);
    const popularSeriesResponse = await fetch(popularSeriesUrl, fetchOptions);
    const popularMovies =
      (await popularMoviesResponse.json()) as TMDBResponse<Movie>;
    const popularSeries =
      (await popularSeriesResponse.json()) as TMDBResponse<Series>;

    return { popularMovies, popularSeries };
  } catch (error) {
    createError({
      statusCode: 500,
      message: error
    });
  }
});
