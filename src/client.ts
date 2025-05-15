import type { App } from "vue";
import ComponentView from "@/components/ComponentView.vue";

export const COMPONENT_NAME = "ComponentView";

export function enhanceAppWithComponentView(app: App): void {
  app.component(COMPONENT_NAME, ComponentView);
}

export { ComponentView };
