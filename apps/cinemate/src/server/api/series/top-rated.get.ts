import { createError, defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || '1';
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const topRatedSeriesUrl = `https://api.themoviedb.org/3/tv/top_rated?page=${page}`;
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const topRatedSeriesResponse = await fetch(topRatedSeriesUrl, fetchOptions);
    const topRatedSeries = await topRatedSeriesResponse.json();

    return { topRatedSeries };
  } catch (error) {
    createError({
      statusCode: 500,
      message: String(error)
    });
  }
});
