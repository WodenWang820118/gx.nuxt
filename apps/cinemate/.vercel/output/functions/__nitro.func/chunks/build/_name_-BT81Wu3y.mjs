import { u as useItemStore, _ as __nuxt_component_0 } from './item-CP_QAsML.mjs';
import { b as __nuxt_component_1$2 } from './server.mjs';
import { useSSRContext, defineComponent, ref, withCtx, unref, openBlock, createBlock, mergeProps, createCommentVNode } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import '../_/nitro.mjs';
import '@iconify/utils';
import 'consola/core';
import 'unhead';
import 'vue-router';
import 'node:process';
import 'node:tty';

const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "MovieItem",
  __ssrInlineRender: true,
  props: {
    id: {},
    genre_ids: {},
    original_language: {},
    original_title: {},
    title: {},
    overview: {},
    poster_path: {},
    release_date: {},
    popularity: {},
    vote_average: {},
    vote_count: {},
    video: { type: Boolean },
    adult: { type: Boolean }
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto flex max-w-7xl flex-col gap-8 p-6 md:p-8 lg:flex-row lg:p-10" }, _attrs))}><div class="lg:w-1/3"><img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500${_ctx.poster_path}`)}${ssrRenderAttr("alt", _ctx.title)} class="h-auto w-full rounded-xl object-cover shadow-lg" loading="lazy"></div><div class="space-y-6 lg:w-2/3"><div class="space-y-4"><h1 class="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">${ssrInterpolate(_ctx.title)}</h1><div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300"><span class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-calendar" }, null, _parent));
      _push(` ${ssrInterpolate(new Date(_ctx.release_date).getFullYear())}</span><span class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star",
        class: "text-yellow-400"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.vote_average.toFixed(1))}/10 </span><span class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-users" }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.vote_count.toLocaleString())} votes </span><span class="uppercase">${ssrInterpolate(_ctx.original_language)}</span></div></div><div class="space-y-2"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Overview</h2><p class="leading-relaxed text-gray-700 dark:text-gray-300">${ssrInterpolate(_ctx.overview)}</p></div><div class="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2"><div class="space-y-2"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Details</h3><ul class="space-y-2 text-gray-700 dark:text-gray-300"><li class="flex items-center gap-2"><span class="font-medium">Original Title:</span> ${ssrInterpolate(_ctx.original_title)}</li><li class="flex items-center gap-2"><span class="font-medium">Popularity:</span> ${ssrInterpolate(_ctx.popularity.toFixed(1))}</li><li class="flex items-center gap-2"><span class="font-medium">Adult Content:</span> ${ssrInterpolate(_ctx.adult ? "Yes" : "No")}</li></ul></div></div></div></div>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MovieItem.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "SeriesItem",
  __ssrInlineRender: true,
  props: {
    adult: { type: Boolean },
    genre_ids: {},
    id: {},
    original_language: {},
    original_name: {},
    overview: {},
    popularity: {},
    poster_path: {},
    first_air_date: {},
    name: {},
    vote_average: {},
    vote_count: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = __nuxt_component_1$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "mx-auto flex max-w-7xl flex-col gap-8 p-6 md:p-8 lg:flex-row lg:p-10" }, _attrs))}><div class="lg:w-1/3"><img${ssrRenderAttr("src", `https://image.tmdb.org/t/p/w500${_ctx.poster_path}`)}${ssrRenderAttr("alt", _ctx.name)} class="h-auto w-full rounded-xl object-cover shadow-lg" loading="lazy"></div><div class="space-y-6 lg:w-2/3"><div class="space-y-4"><h1 class="text-3xl font-bold text-gray-900 md:text-4xl dark:text-white">${ssrInterpolate(_ctx.name)}</h1><div class="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-300"><span class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-calendar" }, null, _parent));
      _push(` ${ssrInterpolate(new Date(_ctx.first_air_date).getFullYear())}</span><span class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, {
        name: "i-heroicons-star",
        class: "text-yellow-400"
      }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.vote_average.toFixed(1))}/10 </span><span class="flex items-center gap-2">`);
      _push(ssrRenderComponent(_component_UIcon, { name: "i-heroicons-users" }, null, _parent));
      _push(` ${ssrInterpolate(_ctx.vote_count.toLocaleString())} votes </span><span class="uppercase">${ssrInterpolate(_ctx.original_language)}</span></div></div><div class="space-y-2"><h2 class="text-xl font-semibold text-gray-900 dark:text-white">Overview</h2><p class="leading-relaxed text-gray-700 dark:text-gray-300">${ssrInterpolate(_ctx.overview)}</p></div><div class="grid grid-cols-1 gap-4 pt-4 md:grid-cols-2"><div class="space-y-2"><h3 class="text-lg font-semibold text-gray-900 dark:text-white">Details</h3><ul class="space-y-2 text-gray-700 dark:text-gray-300"><li class="flex items-center gap-2"><span class="font-medium">Original Name:</span> ${ssrInterpolate(_ctx.original_name)}</li><li class="flex items-center gap-2"><span class="font-medium">Popularity:</span> ${ssrInterpolate(_ctx.popularity.toFixed(1))}</li><li class="flex items-center gap-2"><span class="font-medium">Adult Content:</span> ${ssrInterpolate(_ctx.adult ? "Yes" : "No")}</li></ul></div></div></div></div>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SeriesItem.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
function isMovie(item) {
  return "release_date" in item && "title" in item;
}
function isSeries(item) {
  return "first_air_date" in item && "name" in item;
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "[name]",
  __ssrInlineRender: true,
  setup(__props) {
    useItemStore();
    const item = ref(void 0);
    function getMovieProps(movie) {
      return {
        id: movie.id,
        poster_path: movie.poster_path,
        title: movie.title,
        overview: movie.overview,
        release_date: movie.release_date,
        popularity: movie.popularity,
        item: movie,
        original_language: movie.original_language,
        adult: movie.adult,
        vote_average: movie.vote_average,
        vote_count: movie.vote_count,
        video: movie.video,
        genre_ids: movie.genre_ids,
        original_title: movie.original_title
      };
    }
    function getSeriesProps(series) {
      return {
        id: series.id,
        poster_path: series.poster_path,
        name: series.name,
        overview: series.overview,
        first_air_date: series.first_air_date,
        popularity: series.popularity,
        item: series,
        original_language: series.original_language,
        adult: series.adult,
        vote_average: series.vote_average,
        vote_count: series.vote_count,
        genre_ids: series.genre_ids,
        original_name: series.original_name
      };
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0;
      const _component_MovieItem = _sfc_main$2;
      const _component_SeriesItem = _sfc_main$1;
      _push(ssrRenderComponent(_component_UContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (item.value && ("isMovie" in _ctx ? _ctx.isMovie : unref(isMovie))(item.value)) {
              _push2(ssrRenderComponent(_component_MovieItem, getMovieProps(item.value), null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            if (item.value && ("isSeries" in _ctx ? _ctx.isSeries : unref(isSeries))(item.value)) {
              _push2(ssrRenderComponent(_component_SeriesItem, getSeriesProps(item.value), null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              item.value && ("isMovie" in _ctx ? _ctx.isMovie : unref(isMovie))(item.value) ? (openBlock(), createBlock(_component_MovieItem, mergeProps({ key: 0 }, getMovieProps(item.value)), null, 16)) : createCommentVNode("", true),
              item.value && ("isSeries" in _ctx ? _ctx.isSeries : unref(isSeries))(item.value) ? (openBlock(), createBlock(_component_SeriesItem, mergeProps({ key: 1 }, getSeriesProps(item.value)), null, 16)) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/item/[name].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_name_-BT81Wu3y.mjs.map
