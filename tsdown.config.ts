import { defineConfig } from "tsdown/config";
import vue from "unplugin-vue/rolldown";

export default defineConfig({
  format: "esm",
  entry: {
    index: "src/node/markdown.ts",
  },
  plugins: [vue()],
  alias: {
    "@": "src/",
  },
  external: ["vue", "vitepress"],
});
