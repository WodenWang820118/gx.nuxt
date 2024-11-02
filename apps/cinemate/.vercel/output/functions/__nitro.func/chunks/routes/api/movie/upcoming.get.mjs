import { d as defineEventHandler, g as getQuery, c as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import '@iconify/utils';
import 'consola/core';

const upcoming_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || "1";
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const upcomingMoviesUrl = `https://api.themoviedb.org/3/movie/upcoming?page=${page}`;
    const fetchOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const upcomingMoviesResponse = await fetch(upcomingMoviesUrl, fetchOptions);
    const upcomingMovies = await upcomingMoviesResponse.json();
    return { upcomingMovies };
  } catch (error) {
    createError({
      statusCode: 500,
      message: String(error)
    });
  }
});

export { upcoming_get as default };
//# sourceMappingURL=upcoming.get.mjs.map
