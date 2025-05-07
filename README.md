# Vitepress Plugin Vue Component View

[简体中文](README-zh-CN.md)

A VitePress plugin to display Vue components in your documentation with an automatically generated two-tab interface: one for the component's preview and another to show its source code.

## Features

- 🖼️ **Component Preview** - Directly view the rendered output of your component within the documentation.
- 📝 **Source Code View** - View the complete source code of the component in a dedicated tab.
- 🎨 **Syntax Highlighting** - Provides syntax highlighting for source code using highlight.js.
- 📋 **Code Copying** - One-click copy for the component's source code.
- 🌓 **Dark Mode Support** - Automatically adapts to VitePress's light and dark themes.
- ⚡ **Lightweight** - No complex dependencies.

## Installation

```bash
npm install vitepress-plugin-vue-component-view --save-dev
# Or
yarn add vitepress-plugin-vue-component-view --dev
# Or
pnpm add vitepress-plugin-vue-component-view -D

```

## Usage

### 1. Configure VitePress

Add the plugin to your VitePress configuration file (`.vitepress/config.js` or `.vitepress/config.ts`):
```js
import { defineConfig } from 'vitepress'
import componentTabs from 'vitepress-plugin-vue-component-view'

export default defineConfig({
  // ... other configurations

  markdown: {
    config: (md) => {
      md.use(componentTabs().extendMarkdown)
    }
  },

  vite: {
    plugins: [componentTabs()]
  }
})
```

### 2. Use in Markdown

Use the `component-demo` container in your Markdown files to display components:

```markdown
::: component-demo
vue component
:::
```

This will generate an interface with two tabs: one showing the component's preview and the other showing its source code.

### 3. Add Styles (Optional)

Import the plugin styles in your `.vitepress/theme/index.js`:

```js
import DefaultTheme from 'vitepress/theme'
import "vitepress-plugin-vue-component-view/style"

export default {
  ...DefaultTheme,
  enhanceAppR{ app }) {
    // Your enhancements
  }
}
```

## Configuration Options

The plugin supports the following configuration options:
```js
componentTabs({
  // More configuration options can be added in the future
})
```

## Example

### Button Component

This is an example button component:

```markdown
::: component-demo
<template>
  <button class="my-button" @click="count++">
    Clicked {{ count }} times
  </button>
</template>

<script setup>
import { ref } from 'vue';

const count = ref(0)
</script>

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
:::
```

You can view the component's preview and source code in the tabs above.

## Notes

- Component paths should be relative to the project root.
- Current version supports simple Vue components; complex components might require additional configuration. - Components must be valid Single File Components (SFCs).
## License

MIT
```
