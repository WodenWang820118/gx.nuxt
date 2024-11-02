import { createError, defineEventHandler } from 'h3';
import { Series, TMDBResponse } from '../../../utils/movie.interface';

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
    const popularSeriesUrl = `https://api.themoviedb.org/3/tv/popular?page=${page}`;
    const popularSeriesResponse = await fetch(popularSeriesUrl, fetchOptions);
    const popularSeries =
      (await popularSeriesResponse.json()) as TMDBResponse<Series>;
    return { popularSeries };
  } catch (error) {
    createError({
      statusCode: 500,
      message: String(error)
    });
  }
});
