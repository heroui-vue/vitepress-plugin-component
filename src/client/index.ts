import type { App } from "vue";
import ComponentView from "./ComponentView.vue";

export const COMPONENT_NAME = "ComponentView";

export function enhanceAppWithComponentView(app: App): void {
  app.component(COMPONENT_NAME, ComponentView);
}

export { ComponentView };
