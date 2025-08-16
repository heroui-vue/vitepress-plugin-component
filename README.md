# Vitepress Plugin Vue Component View

[简体中文](README-zh-CN.md)

A VitePress plugin to display Vue components in your documentation with an automatically generated two-tab interface: one for the component's preview and another to show its source code.

## Features

- [x] **Component Preview** - Directly view the rendered output of your component within the documentation.
- [x] **Syntax Highlighting** - Compatible with VitePress's syntax highlighting.
- [ ] **Code Copying** - One-click copy for the component's source code.
- [x] **Dark Mode Support** - Automatically adapts to VitePress's light and dark themes.
- [x] **Lightweight** - No complex dependencies, only `2kb` / gzip:`1kb`.

## Installation

```bash
npm install vitepress-plugin-component --save-dev
```

## Configuration

### Add Markdown Plugin

Add the plugin to your VitePress configuration file (`.vitepress/config.js` or `.vitepress/config.ts`):

```ts
import { defineConfig } from 'vitepress'
import { componentViewMarkdownPlugin } from 'vitepress-plugin-component'

export default defineConfig({
  // ... other configurations

  markdown: {
    config: (md) => {
      md.use(componentViewMarkdownPlugin)
    }
  },
})
```

### Configure Client

```ts
import { enhanceAppWithComponentView } from 'vitepress-plugin-component/client'

export default {
  enhanceApp({ app }) {
    enhanceAppWithComponentView(app)
  }
}
```

## Example

This is an example of button SFC:

```vue
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0)
</script>

<template>
  <button class="my-button" @click="count++">
    Clicked {{ count }} times
  </button>
</template>

<style>
.my-button {
  background-color: #3eaf7c;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}
</style>
```

VitePress supports [importing Vue components in markdown files](https://vitepress.dev/guide/using-vue#using-components), we import the Button component in the same way:

```js
import Button from './Button.vue'
```

Then use the specified syntax:

```markdown
::: component-view
<Button />
:::
```

You can view the component's preview and source code in the tabs above.

## Notes

- Component paths should be relative to the project root.
- Current version supports simple Vue components; complex components might require additional configuration. - Components must be valid Single File Components (SFCs).
## License

[MIT](LICENSE)
