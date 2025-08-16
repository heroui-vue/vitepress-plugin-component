import { defineConfig } from "vitepress";
import { componentViewMarkdownPlugin } from "vitepress-plugin-component";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vitepress-plugin-component",
  description: "vitepress-plugin-component plugin",
  markdown: {
    config: (md) => {
      md.use(componentViewMarkdownPlugin);
    },
  },
});
