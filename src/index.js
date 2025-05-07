import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import markdownPlugin from './markdown.js'

// 获取__dirname的替代方法
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default function vitepressComponentTabs() {
  return {
    name: 'vitepress-plugin-component-tabs',

    // 提供客户端代码
    enhanceApp(ctx) {
      // 这里会被 VitePress 的构建过程调用
      // ctx.app 是 Vue 应用实例
    },

    // 扩展 Markdown
    extendMarkdown: markdownPlugin,

    // 设置别名，使插件的组件可以在 VitePress 中被引用
    alias: {
      '@vitepress-plugin-component-tabs': path.resolve(__dirname, './'),
    },

    // 提供客户端代码
    clientConfigFile: path.resolve(__dirname, 'client.js'),

    async transform(code, id) {
      // 在这里可以对代码进行变换
      return code
    },
  }
}
