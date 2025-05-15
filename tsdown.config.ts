import { defineConfig } from "tsdown/config";
import vue from "unplugin-vue/rolldown";

export default defineConfig({
  entry: {
    index: "src/markdown.js",
    client: "src/client.js",
  },
  plugins: [
    vue({
      style: {
        preprocessOptions: {},
      },
    }),
  ],
  alias: {
    "@": "src/",
  },
  external: ["vue", "vitepress", /^@types/],
  outputOptions: {
    cssChunkFileNames: "styles.css",
  },
});
