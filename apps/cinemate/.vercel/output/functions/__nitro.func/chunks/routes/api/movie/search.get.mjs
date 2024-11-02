import { d as defineEventHandler, g as getQuery, c as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import '@iconify/utils';
import 'consola/core';

const search_get = defineEventHandler(async (event) => {
  try {
    const { searchTerm } = getQuery(event);
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const movieSearchUrl = "https://api.themoviedb.org/3/search/movie";
    const seriesSearchUrl = "https://api.themoviedb.org/3/search/tv";
    const movieUrl = `${movieSearchUrl}?query=${encodeURIComponent(searchTerm)}`;
    const seriesUrl = `${seriesSearchUrl}?query=${encodeURIComponent(searchTerm)}`;
    const fetchOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const moviesResponse = await fetch(movieUrl, fetchOptions);
    const seriesResponse = await fetch(seriesUrl, fetchOptions);
    const movies = await moviesResponse.json();
    const series = await seriesResponse.json();
    return { movies, series };
  } catch (error) {
    createError({
      statusCode: 500,
      message: String(error)
    });
  }
});

export { search_get as default };
//# sourceMappingURL=search.get.mjs.map
