import { Movie, TMDBResponse } from '../../../utils/movie.interface';
import { createError, defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || '1';
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const movieUrl = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
    // Fetch options
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const moviesResponse = await fetch(movieUrl, fetchOptions);
    const movies = (await moviesResponse.json()) as TMDBResponse<Movie>;

    return { movies };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: String(error)
    });
  }
});
