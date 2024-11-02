import { d as defineEventHandler, g as getQuery, c as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import '@iconify/utils';
import 'consola/core';

const popular_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || "1";
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const fetchOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const popularMoviesUrl = `https://api.themoviedb.org/3/movie/popular?page=${page}`;
    const popularMoviesResponse = await fetch(popularMoviesUrl, fetchOptions);
    const popularMovies = await popularMoviesResponse.json();
    return { popularMovies };
  } catch (error) {
    createError({
      statusCode: 500,
      message: String(error)
    });
  }
});

export { popular_get as default };
//# sourceMappingURL=popular.get.mjs.map
