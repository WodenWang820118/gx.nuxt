import { d as defineEventHandler, g as getQuery, c as createError } from '../../../_/nitro.mjs';
import 'node:http';
import 'node:https';
import '@iconify/utils';
import 'consola/core';

const nowPlaying_get = defineEventHandler(async (event) => {
  try {
    const query = getQuery(event);
    const page = query.page || "1";
    const AccessToken = process.env.NUXT_ACCESS_TOKEN;
    const nowPlayingUrl = `https://api.themoviedb.org/3/movie/now_playing?page=${page}`;
    const fetchOptions = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${AccessToken}`
      }
    };
    const nowPlayingMoviesResponse = await fetch(nowPlayingUrl, fetchOptions);
    const nowPlayingMovies = await nowPlayingMoviesResponse.json();
    return { nowPlayingMovies };
  } catch (error) {
    createError({
      statusCode: 500,
      message: String(error)
    });
  }
});

export { nowPlaying_get as default };
//# sourceMappingURL=now-playing.get.mjs.map
