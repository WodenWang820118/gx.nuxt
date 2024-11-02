import { defineComponent, toRef, computed, useSSRContext, ref, createVNode, resolveDynamicComponent, mergeProps, withCtx, renderSlot } from 'vue';
import { m as mergeConfig, c as appConfig, f as useUI, t as twMerge, h as twJoin, d as defineStore, _ as _export_sfc } from './server.mjs';
import { ssrRenderVNode, ssrRenderSlot } from 'vue/server-renderer';

const container = {
  base: "mx-auto",
  padding: "px-4 sm:px-6 lg:px-8",
  constrained: "max-w-7xl"
};
const config = mergeConfig(appConfig.ui.strategy, appConfig.ui.container, container);
const _sfc_main = defineComponent({
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
    const { ui, attrs } = useUI("container", toRef(props, "ui"), config);
    const containerClass = computed(() => {
      return twMerge(twJoin(
        ui.value.base,
        ui.value.padding,
        ui.value.constrained
      ), props.class);
    });
    return {
      // eslint-disable-next-line vue/no-dupe-keys
      ui,
      attrs,
      containerClass
    };
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.as), mergeProps({ class: _ctx.containerClass }, _ctx.attrs, _attrs), {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
      } else {
        return [
          renderSlot(_ctx.$slots, "default")
        ];
      }
    }),
    _: 3
  }), _parent);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("../../../node_modules/.pnpm/@nuxt+ui@2.18.7_axios@1.7.7_change-case@5.4.4_magicast@0.3.5_rollup@4.24.3_ts-node@10.9.1_@sw_x2wxiupvk3xu33mpalbku64iwm/node_modules/@nuxt/ui/dist/runtime/components/layout/Container.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
const useItemStore = defineStore("item", () => {
  const item = ref(void 0);
  const fetchItem = () => {
    try {
      return item.value;
    } catch (err) {
      console.error("Error fetching movies and series:", err);
    }
  };
  const setItem = (newItem) => {
    item.value = newItem;
  };
  return {
    item,
    setItem,
    fetchItem
  };
});

export { __nuxt_component_0 as _, useItemStore as u };
//# sourceMappingURL=item-CP_QAsML.mjs.map
