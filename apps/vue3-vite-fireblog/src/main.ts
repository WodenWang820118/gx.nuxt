import { createApp } from "vue";
import App from "./app.vue";
import router from "./routes";
import { createPinia } from "pinia";

const app = createApp(App);
const pinia = createPinia();

async function loadPlugins() {
  // Dynamically import the VueShowdownPlugin
  const { VueShowdownPlugin } = await import("vue-showdown");

  // Dynamically import the piniaPluginPersistedstate
  const { default: piniaPluginPersistedstate } = await import(
    "pinia-plugin-persistedstate"
  );

  // Use the plugins
  pinia.use(piniaPluginPersistedstate);

  app.use(VueShowdownPlugin, {
    flavor: "github",
    options: {
      emoji: true,
      simplifiedAutoLink: true,
      strikethrough: true,
      tables: true,
      tasklists: true,
      simpleLineBreaks: true,
      openLinksInNewWindow: true,
      backslashEscapesHTMLTags: true,
      ghCodeBlocks: true,
      ghCompatibleHeaderId: true,
      parseImgDimensions: true,
      requireSpaceBeforeHeadingText: true,
      ghMentions: true,
    },
  });
}

// Load plugins conditionally or based on some user interaction
loadPlugins().then(() => {
  app.use(pinia);
  app.use(router);
  app.mount("#app");
});
