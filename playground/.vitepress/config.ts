import { defineConfig } from "vitepress";
import { componentViewMarkdownPlugin } from "vitepress-plugin-vue-component-view";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vitepress-plugin-vue-component-view",
  description: "vitepress-plugin-vue-component-view plugin",
  markdown: {
    config: (md) => {
      md.use(componentViewMarkdownPlugin);
    },
  },
});
