# VitePress Plugin Component Tabs

一个 VitePress 插件，用于在文档中展示 Vue 组件，并自动生成包含两个选项卡的展示界面：一个用于组件的预览，另一个用于显示组件的源代码。

## 特性

- 🖼️ **组件预览** - 在文档中直接查看组件的渲染效果
- 📝 **源代码查看** - 在选项卡中查看组件的完整源代码
- 🎨 **语法高亮** - 使用 highlight.js 提供源代码的语法高亮
- 📋 **代码复制** - 一键复制组件源代码
- 🌓 **暗黑模式支持** - 自动适配 VitePress 的明暗主题
- ⚡ **轻量级** - 没有复杂的依赖

## 安装

```bash
npm install vitepress-plugin-vue-component-view --save-dev
# 或者
yarn add vitepress-plugin-vue-component-view --dev
# 或者
pnpm add vitepress-plugin-vue-component-view -D
```

## 使用方法

### 1. 配置 VitePress

在 VitePress 配置文件中添加插件（`.vitepress/config.js` 或 `.vitepress/config.ts`）：

```js
import { defineConfig } from 'vitepress'
import componentTabs from 'vitepress-plugin-vue-component-view'

export default defineConfig({
  // ... 其他配置

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

### 2. 在 Markdown 中使用

在你的 Markdown 文件中使用 `component-demo` 容器来展示组件：

```markdown
::: component-demo
vue component
:::
```

这将生成一个带有两个选项卡的界面：一个显示组件的预览，另一个显示组件的源代码。

### 3. 添加样式（可选）

在 `.vitepress/theme/index.js` 中导入插件样式：

```js
import DefaultTheme from 'vitepress/theme'
import 'vitepress-plugin-vue-component-view/style'

export default {
  ...DefaultTheme,
  enhanceApp({ app }) {
    // 你的增强代码
  }
}
```

## 配置选项

插件支持以下配置选项：

```js
componentTabs({
  // 未来可以添加更多配置选项
})
```

## 示例


# 按钮组件

这是一个示例按钮组件：

```markdown
::: component-demo
<template>
  <button class="my-button" @click="count++">
    点击了 {{ count }} 次
  </button>
</template>

<script setup>
import { ref } from 'vue'

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

你可以在上面的选项卡中查看组件的预览和源代码。

## 注意事项

- 组件路径应该相对于项目根目录
- 当前版本主要支持简单的 Vue 组件，复杂的组件可能需要额外的配置
- 组件必须是有效的单文件组件 (SFC)

## 许可证

MIT
