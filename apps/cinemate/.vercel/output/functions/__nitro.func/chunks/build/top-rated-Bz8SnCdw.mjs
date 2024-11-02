import { _ as __nuxt_component_0 } from './item-CP_QAsML.mjs';
import { _ as _sfc_main$3 } from './MovieCard-Bu6ATl1q.mjs';
import { _ as __nuxt_component_1 } from './Pagination-GSnWlSdh.mjs';
import { useSSRContext, defineComponent, ref, watch, mergeProps, withCtx, createVNode, computed } from 'vue';
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

const useTopRatedStore = defineStore("top-rated", () => {
  const movies = ref([]);
  const moviePagination = ref({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    pageSize: 10
  });
  const series = ref([]);
  const seriesPagination = ref({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    pageSize: 10
  });
  const isLoading = ref(false);
  const error = ref(null);
  const topMovies = computed(
    () => [...movies.value].sort((a, b) => b.popularity - a.popularity)
  );
  const topSeries = computed(
    () => [...series.value].sort((a, b) => b.popularity - a.popularity)
  );
  const hasContent = computed(
    () => movies.value.length > 0 || series.value.length > 0
  );
  const fetchTopRatedMovies = async (page = 1) => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await $fetch("api/movie/top-rated", {
        params: { page: page.toString() }
      });
      if (data) {
        movies.value = data.topRatedMovies.results || [];
        moviePagination.value = {
          currentPage: page,
          totalPages: data.topRatedMovies.total_pages,
          totalResults: data.topRatedMovies.total_results,
          pageSize: 10
        };
      }
    } catch (err) {
      error.value = "Failed to fetch top rated content";
      console.error("Error fetching top rated content:", err);
    } finally {
      isLoading.value = false;
    }
  };
  const fetchTopRatedSeries = async (page = 1) => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await $fetch("api/series/top-rated", {
        params: { page: page.toString() }
      });
      if (data) {
        series.value = data.topRatedSeries.results || [];
        seriesPagination.value = {
          currentPage: page,
          totalPages: data.topRatedSeries.total_pages,
          totalResults: data.topRatedSeries.total_results,
          pageSize: 10
        };
      }
    } catch (err) {
      error.value = "Failed to fetch top rated series";
      console.error("Error fetching top rated series:", err);
    } finally {
      isLoading.value = false;
    }
  };
  function resetState() {
    movies.value = [];
    series.value = [];
    error.value = null;
  }
  return {
    // State
    movies,
    series,
    isLoading,
    error,
    moviePagination,
    seriesPagination,
    // Getters
    topMovies,
    topSeries,
    hasContent,
    // Actions
    fetchTopRatedMovies,
    fetchTopRatedSeries,
    resetState
  };
});
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "TopRatedMovieSection",
  __ssrInlineRender: true,
  setup(__props) {
    const movies = ref([]);
    const topRatedStore = useTopRatedStore();
    const moviePagination = ref({
      currentPage: 1,
      totalResults: 0,
      totalPages: 0,
      pageSize: 10
    });
    const handleMoviePageChange = async (page) => {
      console.log("Movie Page to:", page);
      await topRatedStore.fetchTopRatedMovies(page);
    };
    watch(
      () => topRatedStore.topMovies,
      (newMovies) => {
        movies.value = newMovies;
      },
      { deep: true }
    );
    watch(
      () => topRatedStore.moviePagination,
      (newPagination) => {
        moviePagination.value = newPagination;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MovieCard = _sfc_main$3;
      const _component_UPagination = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mb-12" }, _attrs))}><h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Top Rated Movies </h1><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"><!--[-->`);
      ssrRenderList(movies.value, (mov) => {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_MovieCard, mergeProps({ ref_for: true }, mov, { item: mov }), null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="mt-8 flex justify-center">`);
      _push(ssrRenderComponent(_component_UPagination, {
        modelValue: moviePagination.value.currentPage,
        "onUpdate:modelValue": [($event) => moviePagination.value.currentPage = $event, handleMoviePageChange],
        total: moviePagination.value.totalPages,
        "page-count": moviePagination.value.pageSize,
        ui: { wrapper: "justify-center" },
        "active-button": { variant: "solid", color: "primary" },
        "inactive-button": { variant: "outline", color: "gray" },
        "show-first": "",
        "show-last": ""
      }, null, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TopRatedMovieSection.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TopRatedSeriesSection",
  __ssrInlineRender: true,
  setup(__props) {
    const series = ref([]);
    const topRatedStore = useTopRatedStore();
    const seriesPagination = ref({
      currentPage: 1,
      totalResults: 0,
      totalPages: 0,
      pageSize: 10
    });
    const handleSeriesPageChange = async (page) => {
      console.log("Series Page to:", page);
      await topRatedStore.fetchTopRatedSeries(page);
    };
    watch(
      () => topRatedStore.topSeries,
      (newSeries) => {
        series.value = newSeries;
      },
      { deep: true }
    );
    watch(
      () => topRatedStore.seriesPagination,
      (newPagination) => {
        seriesPagination.value = newPagination;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_SeriesCard = _sfc_main$4;
      const _component_UPagination = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mb-12" }, _attrs))}><h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Top Rated TV Series </h1><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"><!--[-->`);
      ssrRenderList(series.value, (tvSeries) => {
        _push(`<div>`);
        _push(ssrRenderComponent(_component_SeriesCard, mergeProps({ ref_for: true }, tvSeries, { item: tvSeries }), null, _parent));
        _push(`</div>`);
      });
      _push(`<!--]--></div><div class="mt-8 flex justify-center">`);
      _push(ssrRenderComponent(_component_UPagination, {
        modelValue: seriesPagination.value.currentPage,
        "onUpdate:modelValue": [($event) => seriesPagination.value.currentPage = $event, handleSeriesPageChange],
        total: seriesPagination.value.totalPages,
        "page-count": seriesPagination.value.pageSize,
        ui: { wrapper: "justify-center" },
        "active-button": { variant: "solid", color: "primary" },
        "inactive-button": { variant: "outline", color: "gray" },
        "show-first": "",
        "show-last": ""
      }, null, _parent));
      _push(`</div></section>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/TopRatedSeriesSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UContainer = __nuxt_component_0;
  const _component_TopRatedMovieSection = _sfc_main$2;
  const _component_TopRatedSeriesSection = _sfc_main$1;
  _push(ssrRenderComponent(_component_UContainer, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_TopRatedMovieSection, null, null, _parent2, _scopeId));
        _push2(ssrRenderComponent(_component_TopRatedSeriesSection, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_TopRatedMovieSection),
          createVNode(_component_TopRatedSeriesSection)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/top-rated.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const topRated = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { topRated as default };
//# sourceMappingURL=top-rated-Bz8SnCdw.mjs.map
