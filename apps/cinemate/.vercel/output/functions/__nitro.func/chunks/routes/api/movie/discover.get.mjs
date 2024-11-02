import { d as defineEventHandler, g as getQuery, c as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import '@iconify/utils';
import 'consola/core';

const discover_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || "1";
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const movieUrl = `https://api.themoviedb.org/3/discover/movie?page=${page}`;
    const fetchOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const moviesResponse = await fetch(movieUrl, fetchOptions);
    const movies = await moviesResponse.json();
    return { movies };
  } catch (error) {
    throw createError({
      statusCode: 500,
      message: String(error)
    });
  }
});

export { discover_get as default };
//# sourceMappingURL=discover.get.mjs.map
