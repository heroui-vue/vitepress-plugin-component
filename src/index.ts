import path, { dirname } from 'node:path'
import { fileURLToPath } from 'node:url'
import type { Plugin } from 'vitepress'
import type { App } from 'vue'
import markdownPlugin from './markdown'

// 获取__dirname的替代方法
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default function vitepressComponentTabs(): Plugin {
  return {
    name: 'vitepress-plugin-component-tabs',

    // 提供客户端代码
    enhanceApp({ app }: { app: App }) {
      // 这里会被 VitePress 的构建过程调用
      // ctx.app 是 Vue 应用实例
    },

    // 扩展 Markdown
    markdown: {
      config: markdownPlugin
    },

    // 设置别名，使插件的组件可以在 VitePress 中被引用
    viteConfig: {
      resolve: {
        alias: {
          '@vitepress-plugin-component-tabs': path.resolve(__dirname, './')
        }
      }
    },

    // 提供客户端代码
    clientConfigFile: path.resolve(__dirname, './client.ts'),

    async transform(code: string, id: string): Promise<string> {
      // 在这里可以对代码进行变换
      return code
    }
  }
}