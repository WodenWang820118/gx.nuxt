import { a as __nuxt_component_0 } from './MovieCard-Bu6ATl1q.mjs';
import { a as __nuxt_component_0$3 } from './server.mjs';
import { useSSRContext, defineComponent, ref, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr } from 'vue/server-renderer';
import { u as useItemStore } from './item-CP_QAsML.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "SeriesCard",
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
    const imageUrl = ref("https://image.tmdb.org/t/p/w500");
    const itemStore = useItemStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-8"${_scopeId}>${ssrInterpolate(_ctx.name)}</div>`);
          } else {
            return [
              createVNode("div", { class: "h-8" }, toDisplayString(_ctx.name), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: `/item/${_ctx.name}`,
              onClick: ($event) => unref(itemStore).setItem({
                id: _ctx.id,
                name: _ctx.name,
                poster_path: _ctx.poster_path,
                first_air_date: _ctx.first_air_date,
                overview: _ctx.overview,
                genre_ids: _ctx.genre_ids,
                original_name: _ctx.original_name,
                adult: _ctx.adult,
                vote_average: _ctx.vote_average,
                vote_count: _ctx.vote_count,
                original_language: _ctx.original_language,
                popularity: _ctx.popularity
              })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img class="rounded-t-lg"${ssrRenderAttr("src", `${imageUrl.value}${_ctx.poster_path}`)} alt="item Image"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      class: "rounded-t-lg",
                      src: `${imageUrl.value}${_ctx.poster_path}`,
                      alt: "item Image"
                    }, null, 8, ["src"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (_ctx.overview) {
              _push2(`<p class="inline-flex items-center break-all rounded-lg bg-blue-700 px-3 py-2 text-justify text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"${_scopeId}>${ssrInterpolate(_ctx.overview.slice(0, 75))}... </p>`);
            } else {
              _push2(`<p class="inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"${_scopeId}> No overview available </p>`);
            }
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: `/item/${_ctx.name}`,
                onClick: ($event) => unref(itemStore).setItem({
                  id: _ctx.id,
                  name: _ctx.name,
                  poster_path: _ctx.poster_path,
                  first_air_date: _ctx.first_air_date,
                  overview: _ctx.overview,
                  genre_ids: _ctx.genre_ids,
                  original_name: _ctx.original_name,
                  adult: _ctx.adult,
                  vote_average: _ctx.vote_average,
                  vote_count: _ctx.vote_count,
                  original_language: _ctx.original_language,
                  popularity: _ctx.popularity
                })
              }, {
                default: withCtx(() => [
                  createVNode("img", {
                    class: "rounded-t-lg",
                    src: `${imageUrl.value}${_ctx.poster_path}`,
                    alt: "item Image"
                  }, null, 8, ["src"])
                ]),
                _: 1
              }, 8, ["to", "onClick"]),
              _ctx.overview ? (openBlock(), createBlock("p", {
                key: 0,
                class: "inline-flex items-center break-all rounded-lg bg-blue-700 px-3 py-2 text-justify text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }, toDisplayString(_ctx.overview.slice(0, 75)) + "... ", 1)) : (openBlock(), createBlock("p", {
                key: 1,
                class: "inline-flex items-center rounded-lg bg-blue-700 px-3 py-2 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              }, " No overview available "))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/SeriesCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
//# sourceMappingURL=SeriesCard-BPX64ero.mjs.map
