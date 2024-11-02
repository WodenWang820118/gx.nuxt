import { defineComponent, toRef, computed, useSSRContext, ref, withCtx, createVNode, toDisplayString, unref, openBlock, createBlock, resolveDynamicComponent, mergeProps, renderSlot, createCommentVNode } from 'vue';
import { m as mergeConfig, c as appConfig, f as useUI, t as twMerge, h as twJoin, a as __nuxt_component_0$3, _ as _export_sfc } from './server.mjs';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderVNode, ssrRenderClass, ssrRenderSlot } from 'vue/server-renderer';
import { u as useItemStore } from './item-CP_QAsML.mjs';

const card = {
  base: "",
  background: "bg-white dark:bg-gray-900",
  divide: "divide-y divide-gray-200 dark:divide-gray-800",
  ring: "ring-1 ring-gray-200 dark:ring-gray-800",
  rounded: "rounded-lg",
  shadow: "shadow",
  body: {
    base: "",
    background: "",
    padding: "px-4 py-5 sm:p-6"
  },
  header: {
    base: "",
    background: "",
    padding: "px-4 py-5 sm:px-6"
  },
  footer: {
    base: "",
    background: "",
    padding: "px-4 py-4 sm:px-6"
  }
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.card, card);
const _sfc_main$1 = defineComponent({
  inheritAttrs: false,
  props: {
    as: {
      type: String,
      default: "div"
    },
    class: {
      type: [String, Object, Array],
      default: () => ""
    },
    ui: {
      type: Object,
      default: () => ({})
    }
  },
  setup(props) {
    const { ui, attrs } = useUI("card", toRef(props, "ui"), config);
    const cardClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.rounded,
        ui.value.divide,
        ui.value.ring,
        ui.value.shadow,
        ui.value.background
      ), props.class);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      cardClass
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.$attrs.onSubmit ? "form" : _ctx.as), mergeProps({ class: _ctx.cardClass }, _ctx.attrs, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        if (_ctx.$slots.header) {
          _push2(`<div class="${ssrRenderClass([_ctx.ui.header.base, _ctx.ui.header.padding, _ctx.ui.header.background])}"${_scopeId}>`);
          ssrRenderSlot(_ctx.$slots, "header", {}, null, _push2, _parent2, _scopeId);
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.$slots.default) {
          _push2(`<div class="${ssrRenderClass([_ctx.ui.body.base, _ctx.ui.body.padding, _ctx.ui.body.background])}"${_scopeId}>`);
          ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
        if (_ctx.$slots.footer) {
          _push2(`<div class="${ssrRenderClass([_ctx.ui.footer.base, _ctx.ui.footer.padding, _ctx.ui.footer.background])}"${_scopeId}>`);
          ssrRenderSlot(_ctx.$slots, "footer", {}, null, _push2, _parent2, _scopeId);
          _push2(`</div>`);
        } else {
          _push2(`<!---->`);
        }
      } else {
        return [
          _ctx.$slots.header ? (openBlock(), createBlock("div", {
            key: 0,
            class: [_ctx.ui.header.base, _ctx.ui.header.padding, _ctx.ui.header.background]
          }, [
            renderSlot(_ctx.$slots, "header")
          ], 2)) : createCommentVNode("", true),
          _ctx.$slots.default ? (openBlock(), createBlock("div", {
            key: 1,
            class: [_ctx.ui.body.base, _ctx.ui.body.padding, _ctx.ui.body.background]
          }, [
            renderSlot(_ctx.$slots, "default")
          ], 2)) : createCommentVNode("", true),
          _ctx.$slots.footer ? (openBlock(), createBlock("div", {
            key: 2,
            class: [_ctx.ui.footer.base, _ctx.ui.footer.padding, _ctx.ui.footer.background]
          }, [
            renderSlot(_ctx.$slots, "footer")
          ], 2)) : createCommentVNode("", true)
        ];
      }
    }),
    _: 3
  }), _parent);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../node_modules/.pnpm/@nuxt+ui@2.18.7_axios@1.7.7_change-case@5.4.4_magicast@0.3.5_rollup@4.24.3_ts-node@10.9.1_@sw_x2wxiupvk3xu33mpalbku64iwm/node_modules/@nuxt/ui/dist/runtime/components/layout/Card.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "MovieCard",
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
    const imageUrl = ref("https://image.tmdb.org/t/p/w500");
    const itemStore = useItemStore();
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UCard = __nuxt_component_0;
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_UCard, _attrs, {
        header: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="h-8"${_scopeId}>${ssrInterpolate(_ctx.title)}</div>`);
          } else {
            return [
              createVNode("div", { class: "h-8" }, toDisplayString(_ctx.title), 1)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: `/item/${_ctx.title}`,
              onClick: ($event) => unref(itemStore).setItem({
                id: _ctx.id,
                title: _ctx.title,
                poster_path: _ctx.poster_path,
                overview: _ctx.overview,
                release_date: _ctx.release_date,
                popularity: _ctx.popularity,
                original_language: _ctx.original_language,
                adult: _ctx.adult,
                vote_average: _ctx.vote_average,
                vote_count: _ctx.vote_count,
                video: _ctx.video,
                genre_ids: _ctx.genre_ids,
                original_title: _ctx.original_title
              })
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<img class="rounded-t-lg"${ssrRenderAttr("src", `${imageUrl.value}${_ctx.poster_path}`)} alt="Movie Image"${_scopeId2}>`);
                } else {
                  return [
                    createVNode("img", {
                      class: "rounded-t-lg",
                      src: `${imageUrl.value}${_ctx.poster_path}`,
                      alt: "Movie Image"
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
                to: `/item/${_ctx.title}`,
                onClick: ($event) => unref(itemStore).setItem({
                  id: _ctx.id,
                  title: _ctx.title,
                  poster_path: _ctx.poster_path,
                  overview: _ctx.overview,
                  release_date: _ctx.release_date,
                  popularity: _ctx.popularity,
                  original_language: _ctx.original_language,
                  adult: _ctx.adult,
                  vote_average: _ctx.vote_average,
                  vote_count: _ctx.vote_count,
                  video: _ctx.video,
                  genre_ids: _ctx.genre_ids,
                  original_title: _ctx.original_title
                })
              }, {
                default: withCtx(() => [
                  createVNode("img", {
                    class: "rounded-t-lg",
                    src: `${imageUrl.value}${_ctx.poster_path}`,
                    alt: "Movie Image"
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/MovieCard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, __nuxt_component_0 as a };
//# sourceMappingURL=MovieCard-Bu6ATl1q.mjs.map
