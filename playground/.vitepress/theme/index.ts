import DefaultTheme from "vitepress/theme";
import { enhanceAppWithComponentView } from "vitepress-plugin-component/client";

export default {
  extends: DefaultTheme,
  enhanceApp({ app }) {
    enhanceAppWithComponentView(app, {
      localeMappings: {},
    });
  },
};
