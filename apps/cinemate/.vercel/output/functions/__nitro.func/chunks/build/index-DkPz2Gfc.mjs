import { _ as __nuxt_component_0 } from './item-CP_QAsML.mjs';
import { _ as _sfc_main$3 } from './MovieCard-Bu6ATl1q.mjs';
import { useSSRContext, defineComponent, ref, mergeProps, withCtx, createVNode } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, d as defineStore } from './server.mjs';
import { _ as _sfc_main$4 } from './SeriesCard-BPX64ero.mjs';
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

const useDiscoverStore = defineStore("discover", () => {
  const movies = ref([]);
  const series = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const fetchMovies = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await $fetch("api/movie/discover");
      if (data) {
        movies.value = data ? data.movies.results : [];
      }
    } catch (err) {
      error.value = err;
      console.error("Error fetching movies and series:", err);
    } finally {
      isLoading.value = false;
    }
  };
  const fetchSeries = async () => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await $fetch("api/series/discover");
      if (data) {
        series.value = data ? data.series.results : [];
      }
    } catch (err) {
      error.value = err;
      console.error("Error fetching series:", err);
    } finally {
      isLoading.value = false;
    }
  };
  return {
    movies,
    series,
    isLoading,
    error,
    fetchMovies,
    fetchSeries
  };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DiscoverMovieSection",
  __ssrInlineRender: true,
  setup(__props) {
    useDiscoverStore();
    const movies = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MovieCard = _sfc_main$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mb-12" }, _attrs))}><h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Featured Movies </h1><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"><!--[-->`);
      ssrRenderList(movies.value, (mov) => {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_MovieCard, mergeProps({ ref_for: true }, mov, { item: mov }), null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DiscoverMovieSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DiscoverSeriesSection",
  __ssrInlineRender: true,
  setup(__props) {
    useDiscoverStore();
    const series = ref([]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SeriesCard = _sfc_main$4;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mb-12" }, _attrs))}><h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Featured Tv Series </h1><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"><!--[-->`);
      ssrRenderList(series.value, (tvSeries) => {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_SeriesCard, mergeProps({ ref_for: true }, tvSeries, { item: tvSeries }), null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/DiscoverSeriesSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UContainer = __nuxt_component_0;
  const _component_DiscoverMovieSection = _sfc_main$2;
  const _component_DiscoverSeriesSection = _sfc_main$1;
  _push(ssrRenderComponent(_component_UContainer, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_DiscoverMovieSection, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_DiscoverSeriesSection, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_DiscoverMovieSection),
          createVNode(_component_DiscoverSeriesSection)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { index as default };
//# sourceMappingURL=index-DkPz2Gfc.mjs.map
