# vitepress-plugin-vue-component-view

[English](README.md)

一个 VitePress 插件，用于生成一个双标签页组件：一个用于组件预览，另一个用于显示其源代码。

## 功能

- [x] **组件预览** 直接在文档中查看组件的渲染输出。
- [x] **语法高亮** 兼容VitePress的语法高亮。
- [ ] **代码复制** 一键复制组件的源代码。
- [x] **深色模式支持** 自动适应 VitePress 的浅色和深色主题。
- [x] **轻量级** 无复杂的依赖项, 仅 `2kb` / gzip:`1kb`。

## 安装

```bash
npm install vitepress-plugin-vue-component-view --save-dev
```

## 配置

### 添加Markdown插件

将插件添加到您的 VitePress 配置文件中（`.vitepress/config.js` 或 `.vitepress/config.ts`）：

```ts
import { defineConfig } from 'vitepress'
import { componentViewMarkdownPlugin } from 'vitepress-plugin-vue-component-view'

export default defineConfig({
  // ... 其他配置

  markdown: {
    config: (md) => {
      md.use(componentViewMarkdownPlugin)
    }
  },
})
```

### 配置客户端

```ts
import { enhanceAppWithComponentView } from 'vitepress-plugin-vue-component-view/client'

export default {
  enhanceApp({ app }) {
    enhanceAppWithComponentView(app)
  }
}
```

## 示例

这是一个Button组件的示例：

```vue
<script setup lang="ts">
import { ref } from 'vue';

const count = ref(0)
</script>

<template>
  <button class="my-button" @click="count++">
    点击了 {{ count }} 次
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

Vitepress支持[在markdown文件中导入Vue组件](https://vitepress.dev/zh/guide/using-vue#using-components), 我们以同样的方式导入Button组件：

```bash
import Button from './src/Button.vue'
```

然后使用指定的语法：

```markdown
::: component-view
<Button />
:::
```

你可以前往此处[查看效果]([https://nextui-vue-docs.vercel.app/zh/components/button.html#%E4%BD%BF%E7%94%A8](https://nextui.hotdogc.org/zh/components/button.html#%E4%BD%BF%E7%94%A8))。
## 许可证

[MIT](LICENSE)
