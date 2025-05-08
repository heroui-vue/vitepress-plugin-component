import ComponentTabs from "@/components/ComponentView.vue";
import type { App } from "vue";

export const COMPONENT_NAME = "ComponentView";

export function enhanceAppWithComponentView(app: App): void {
  app.component(COMPONENT_NAME, ComponentTabs);
}

export { ComponentTabs };
