import { createError, defineEventHandler } from 'h3';

export default defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || '1';
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const topRatedMoviesUrl = `https://api.themoviedb.org/3/movie/top_rated?page=${page}`;
    const fetchOptions = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const topRatedMoviesResponse = await fetch(topRatedMoviesUrl, fetchOptions);
    const topRatedMovies = await topRatedMoviesResponse.json();

    return { topRatedMovies };
  } catch (error) {
    createError({
      statusCode: 500,
      message: String(error)
    });
  }
});
