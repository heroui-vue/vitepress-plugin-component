import { defineConfig } from "tsdown/config";
import vue from "unplugin-vue/rolldown";

export default defineConfig({
  entry: {
    index: "src/index.js",
    client: "src/client.js",
  },
  plugins: [vue()],
  external: ["vue", "vitepress"],
});
