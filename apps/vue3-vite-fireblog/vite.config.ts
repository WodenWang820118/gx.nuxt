import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import { visualizer } from "rollup-plugin-visualizer";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    visualizer({
      filename: "stats.html", // The name of the output file
      open: true, // Automatically open the visualization in your browser
      gzipSize: true, // Show gzip size
      brotliSize: true, // Show brotli size
    }),
  ],
  optimizeDeps: {
    holdUntilCrawlEnd: true,
    force: true,
  },
  build: {
    cssCodeSplit: true,
    cssMinify: true,
  },
});
