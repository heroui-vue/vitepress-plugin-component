import fs from 'node:fs'
import path from 'node:path'
import markdownItContainer from 'markdown-it-container'

export default function markdownPlugin(md) {
  // 添加自定义容器
  md.use(markdownItContainer, 'component-demo', {
    validate(params) {
      return params.trim().match(/^component-demo(\s+(?:\S.*)?)?$/)
    },
    render(tokens, idx) {
      const token = tokens[idx]

      if (token.nesting === 1) {
        // 开始标签
        const match = token.info.trim().match(/^component-demo\s+(.*)$/)
        let source = ''
        let filename = 'Component.vue'
        let isFile = false

        // 检查是文件路径还是内联组件
        if (match && match[1]) {
          const componentPath = match[1].trim()
          // 看起来像文件路径
          if (!componentPath.startsWith('<')) {
            try {
              const absolutePath = path.resolve(process.cwd(), componentPath)
              source = fs.readFileSync(absolutePath, 'utf-8')
              filename = path.basename(componentPath)
              isFile = true
            }
            catch (error) {
              console.error(`Failed to read component file: ${componentPath}`, error)
              return `<div class="error">Failed to load component: ${componentPath}</div>`
            }
          }
        }

        // 如果不是文件，收集内联组件的内容
        if (!isFile) {
          // 查找内联组件的结束标记
          let i = idx + 1
          const content = []

          while (i < tokens.length && !(tokens[i].type === 'container_component-demo_close')) {
            if (tokens[i].content) {
              content.push(tokens[i].content)
            }
            i++
          }

          // 合并收集到的内容
          source = content.join('\n')
        }

        // 编码源代码，以便在HTML中传递
        const encodedSource = Buffer.from(source).toString('base64')

        // 返回组件标签
        return `<ComponentTabs source="${encodedSource}" filename="${filename}">${source}</ComponentTabs>\n`
      }
      else {
        // 结束标签
        return '</ComponentTabs>\n'
      }
    },
  })
}
