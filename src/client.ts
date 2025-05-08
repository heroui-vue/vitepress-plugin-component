import ComponentTabs from "./components/ComponentTabs.vue";
import type { App } from "vue";

export function enhanceApp({ app }: { app: App }): void {
  app.component("ComponentTabs", ComponentTabs);
}
