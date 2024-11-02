import { Series, TMDBResponse } from '../../../utils/movie.interface';
import { createError, defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || '1';
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const seriesUrl = `https://api.themoviedb.org/3/discover/tv?page=${page}`;
    // Fetch options
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const seriesResponse = await fetch(seriesUrl, fetchOptions);
    const series = (await seriesResponse.json()) as TMDBResponse<Series>;

    return { series };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: String(error)
    });
  }
});
