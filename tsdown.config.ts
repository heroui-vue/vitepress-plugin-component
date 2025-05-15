import { defineConfig } from "tsdown/config";
import vue from "unplugin-vue/rolldown";
import lightningcss from "unplugin-lightningcss/rolldown";

export default defineConfig({
  entry: {
    index: "src/markdown.js",
    client: "src/client.js",
  },
  plugins: [vue(), lightningcss()],
  alias: {
    "@": "src/",
  },
  external: ["vue", "vitepress", /^@types/],
  outputOptions: {
    cssChunkFileNames: "styles.css",
  },
});
