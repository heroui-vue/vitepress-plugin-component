import ComponentView from "./ComponentView.vue";
import { useLocaleMappings } from "./useLocaleMappings";

import type { App } from "vue";
import type { LocaleMappings } from "./useLocaleMappings";

export const COMPONENT_NAME = "ComponentView";

export function enhanceAppWithComponentView(
  app: App,
  options?: {
    localeMappings?: LocaleMappings;
  },
): void {
  const { localeMappings = {} } = options || {};

  app.component(COMPONENT_NAME, ComponentView);

  const { set } = useLocaleMappings(app);
  set(localeMappings);
}

export { ComponentView };
