import { defineConfig } from "vitepress";
import { componentViewMarkdownPlugin } from "vitepress-plugin-component";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "vitepress-plugin-component",
  description: "vitepress-plugin-component plugin",
  locales: {
    root: {
      label: "English",
      lang: "en",
    },
    zh: {
      label: "简体中文",
      lang: "zh",
      link: "/zh/",
    },
    fr: {
      label: "Français",
      lang: "fr",
      link: "/fr/",
    },
  },
  markdown: {
    config: (md) => {
      md.use(componentViewMarkdownPlugin);
    },
  },
});
