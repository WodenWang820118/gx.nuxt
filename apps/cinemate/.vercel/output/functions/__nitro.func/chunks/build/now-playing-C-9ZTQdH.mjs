import { _ as __nuxt_component_0 } from './item-CP_QAsML.mjs';
import { _ as _sfc_main$2 } from './MovieCard-Bu6ATl1q.mjs';
import { _ as __nuxt_component_1 } from './Pagination-GSnWlSdh.mjs';
import { useSSRContext, defineComponent, ref, watch, mergeProps, withCtx, createVNode, computed } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc, d as defineStore } from './server.mjs';
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

const useNowPlayingStore = defineStore("now-playing", () => {
  const nowPlayingMovies = ref([]);
  const isLoading = ref(false);
  const error = ref(null);
  const moviePagination = ref({
    currentPage: 1,
    totalPages: 0,
    totalResults: 0,
    pageSize: 10
  });
  const fetchNowPlayingMovies = async (page = 1) => {
    isLoading.value = true;
    error.value = null;
    try {
      const data = await $fetch("api/movie/now-playing", {
        params: { page: page.toString() }
      });
      if (data) {
        nowPlayingMovies.value = data.nowPlayingMovies.results;
        moviePagination.value = {
          currentPage: page,
          totalPages: data.nowPlayingMovies.total_pages,
          totalResults: data.nowPlayingMovies.total_results,
          pageSize: 10
        };
      }
    } catch (err) {
      error.value = "Failed to fetch movies";
      console.error("Error fetching movies:", err);
    } finally {
      isLoading.value = false;
    }
  };
  const sortedNowPlayingMovies = computed(() => {
    return [...nowPlayingMovies.value].sort(
      (a, b) => new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
  });
  return {
    // State
    nowPlayingMovies,
    isLoading,
    error,
    moviePagination,
    // Actions
    fetchNowPlayingMovies,
    // Getters
    sortedNowPlayingMovies
  };
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "NowPlayingSection",
  __ssrInlineRender: true,
  setup(__props) {
    const nowPlayingStore = useNowPlayingStore();
    const movies = ref([]);
    const moviePagination = ref({
      currentPage: 1,
      totalResults: 0,
      totalPages: 0,
      pageSize: 10
    });
    const handleMoviePageChange = async (page) => {
      console.log("Movie Page to:", page);
      await nowPlayingStore.fetchNowPlayingMovies(page);
    };
    watch(
      () => nowPlayingStore.nowPlayingMovies,
      (newMovies) => {
        movies.value = newMovies;
      },
      { deep: true }
    );
    watch(
      () => nowPlayingStore.moviePagination,
      (newPagination) => {
        moviePagination.value = newPagination;
      },
      { deep: true }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_MovieCard = _sfc_main$2;
      const _component_UPagination = __nuxt_component_1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "mb-12" }, _attrs))}><h1 class="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"> Now Playing Movies </h1><div class="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"><!--[-->`);
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
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/NowPlayingSection.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_UContainer = __nuxt_component_0;
  const _component_NowPlayingSection = _sfc_main$1;
  _push(ssrRenderComponent(_component_UContainer, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(_component_NowPlayingSection, null, null, _parent2, _scopeId));
      } else {
        return [
          createVNode(_component_NowPlayingSection)
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/now-playing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const nowPlaying = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { nowPlaying as default };
//# sourceMappingURL=now-playing-C-9ZTQdH.mjs.map
