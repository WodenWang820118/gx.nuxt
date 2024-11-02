import { _ as __nuxt_component_0 } from './item-CP_QAsML.mjs';
import { _ as _sfc_main$1 } from './MovieCard-Bu6ATl1q.mjs';
import { _ as _sfc_main$2 } from './SeriesCard-BPX64ero.mjs';
import { defineComponent, ref, watch, withCtx, mergeProps, createVNode, openBlock, createBlock, Fragment, renderList, withDirectives, vModelText, createCommentVNode, useSSRContext, computed } from 'vue';
import { ssrRenderComponent, ssrRenderAttr, ssrRenderList } from 'vue/server-renderer';
import { d as defineStore } from './server.mjs';
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

const useSearchStore = defineStore("search", () => {
  const movies = ref([]);
  const series = ref([]);
  const searchTerm = ref("");
  const isLoading = ref(false);
  const error = ref(null);
  const hasResults = computed(
    () => movies.value.length > 0 || series.value.length > 0
  );
  const totalResults = computed(
    () => movies.value.length + series.value.length
  );
  async function searchContent(term) {
    if (!term.trim()) {
      resetSearch();
      return;
    }
    isLoading.value = true;
    error.value = null;
    searchTerm.value = term;
    try {
      const data = await $fetch(`api/movie/search`, {
        params: {
          searchTerm: term
        }
      });
      if (data) {
        movies.value = data.movies.results || [];
        series.value = data.series.results || [];
      }
    } catch (err) {
      error.value = "Failed to fetch search results";
      console.error("Search error:", err);
    } finally {
      isLoading.value = false;
    }
  }
  function resetSearch() {
    movies.value = [];
    series.value = [];
    searchTerm.value = "";
    error.value = null;
  }
  return {
    // State
    movies,
    series,
    searchTerm,
    isLoading,
    error,
    // Getters
    hasResults,
    totalResults,
    // Actions
    searchContent,
    resetSearch
  };
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "search",
  __ssrInlineRender: true,
  setup(__props) {
    const searchTerm = ref("");
    const movies = ref([]);
    const series = ref([]);
    const searchStore = useSearchStore();
    watch(searchTerm, async (newSearchTerm) => {
      await searchStore.searchContent(newSearchTerm);
      movies.value = searchStore.movies;
      series.value = searchStore.series;
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UContainer = __nuxt_component_0;
      const _component_MovieCard = _sfc_main$1;
      const _component_SeriesCard = _sfc_main$2;
      _push(ssrRenderComponent(_component_UContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="py-4"${_scopeId}><form class="mx-auto max-w-md"${_scopeId}><label for="default-search" class="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"${_scopeId}> Search </label><div class="relative"${_scopeId}><div class="pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3"${_scopeId}><svg class="h-4 w-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20"${_scopeId}><path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"${_scopeId}></path></svg></div><input id="default-search"${ssrRenderAttr("value", searchTerm.value)} type="text" class="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500" placeholder="Search Movies, Series..." required${_scopeId}></div></form></div><section class="py-8"${_scopeId}>`);
            if (movies.value.length) {
              _push2(ssrRenderComponent(_component_UContainer, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h1 class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"${_scopeId2}> Movie Results </h1><ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"${_scopeId2}><!--[-->`);
                    ssrRenderList(movies.value, (mov) => {
                      _push3(`<li${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_MovieCard, mergeProps({ ref_for: true }, mov, { item: mov }), null, _parent3, _scopeId2));
                      _push3(`</li>`);
                    });
                    _push3(`<!--]--></ul>`);
                  } else {
                    return [
                      createVNode("h1", { class: "mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white" }, " Movie Results "),
                      createVNode("ul", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(movies.value, (mov) => {
                          return openBlock(), createBlock("li", {
                            key: mov.id
                          }, [
                            createVNode(_component_MovieCard, mergeProps({ ref_for: true }, mov, { item: mov }), null, 16, ["item"])
                          ]);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section><section class="py-8"${_scopeId}>`);
            if (series.value.length) {
              _push2(ssrRenderComponent(_component_UContainer, null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<h1 class="mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white"${_scopeId2}> Tv Series Results </h1><ul class="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5"${_scopeId2}><!--[-->`);
                    ssrRenderList(series.value, (tvSeries) => {
                      _push3(`<li${_scopeId2}>`);
                      _push3(ssrRenderComponent(_component_SeriesCard, mergeProps({ ref_for: true }, tvSeries, { item: tvSeries }), null, _parent3, _scopeId2));
                      _push3(`</li>`);
                    });
                    _push3(`<!--]--></ul>`);
                  } else {
                    return [
                      createVNode("h1", { class: "mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white" }, " Tv Series Results "),
                      createVNode("ul", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(series.value, (tvSeries) => {
                          return openBlock(), createBlock("li", {
                            key: tvSeries.id
                          }, [
                            createVNode(_component_SeriesCard, mergeProps({ ref_for: true }, tvSeries, { item: tvSeries }), null, 16, ["item"])
                          ]);
                        }), 128))
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(`</section>`);
          } else {
            return [
              createVNode("div", { class: "py-4" }, [
                createVNode("form", { class: "mx-auto max-w-md" }, [
                  createVNode("label", {
                    for: "default-search",
                    class: "sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  }, " Search "),
                  createVNode("div", { class: "relative" }, [
                    createVNode("div", { class: "pointer-events-none absolute inset-y-0 start-0 flex items-center ps-3" }, [
                      (openBlock(), createBlock("svg", {
                        class: "h-4 w-4 text-gray-500 dark:text-gray-400",
                        "aria-hidden": "true",
                        xmlns: "http://www.w3.org/2000/svg",
                        fill: "none",
                        viewBox: "0 0 20 20"
                      }, [
                        createVNode("path", {
                          stroke: "currentColor",
                          "stroke-linecap": "round",
                          "stroke-linejoin": "round",
                          "stroke-width": "2",
                          d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                        })
                      ]))
                    ]),
                    withDirectives(createVNode("input", {
                      id: "default-search",
                      "onUpdate:modelValue": ($event) => searchTerm.value = $event,
                      type: "text",
                      class: "block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 ps-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500",
                      placeholder: "Search Movies, Series...",
                      required: ""
                    }, null, 8, ["onUpdate:modelValue"]), [
                      [vModelText, searchTerm.value]
                    ])
                  ])
                ])
              ]),
              createVNode("section", { class: "py-8" }, [
                movies.value.length ? (openBlock(), createBlock(_component_UContainer, { key: 0 }, {
                  default: withCtx(() => [
                    createVNode("h1", { class: "mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white" }, " Movie Results "),
                    createVNode("ul", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(movies.value, (mov) => {
                        return openBlock(), createBlock("li", {
                          key: mov.id
                        }, [
                          createVNode(_component_MovieCard, mergeProps({ ref_for: true }, mov, { item: mov }), null, 16, ["item"])
                        ]);
                      }), 128))
                    ])
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ]),
              createVNode("section", { class: "py-8" }, [
                series.value.length ? (openBlock(), createBlock(_component_UContainer, { key: 0 }, {
                  default: withCtx(() => [
                    createVNode("h1", { class: "mb-8 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white" }, " Tv Series Results "),
                    createVNode("ul", { class: "grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(series.value, (tvSeries) => {
                        return openBlock(), createBlock("li", {
                          key: tvSeries.id
                        }, [
                          createVNode(_component_SeriesCard, mergeProps({ ref_for: true }, tvSeries, { item: tvSeries }), null, 16, ["item"])
                        ]);
                      }), 128))
                    ])
                  ]),
                  _: 1
                })) : createCommentVNode("", true)
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/search.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=search-DJyqt0ZX.mjs.map
