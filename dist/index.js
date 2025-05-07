// src/index.js
import path2, { dirname } from "path";
import { fileURLToPath } from "url";

// src/markdown.js
import fs from "fs";
import path from "path";
import markdownItContainer from "markdown-it-container";
function markdownPlugin(md) {
  md.use(markdownItContainer, "component-demo", {
    validate(params) {
      return params.trim().match(/^component-demo(\s+(?:\S.*)?)?$/);
    },
    render(tokens, idx) {
      const token = tokens[idx];
      if (token.nesting === 1) {
        const match = token.info.trim().match(/^component-demo\s+(.*)$/);
        let source = "";
        let filename = "Component.vue";
        let isFile = false;
        if (match && match[1]) {
          const componentPath = match[1].trim();
          if (!componentPath.startsWith("<")) {
            try {
              const absolutePath = path.resolve(process.cwd(), componentPath);
              source = fs.readFileSync(absolutePath, "utf-8");
              filename = path.basename(componentPath);
              isFile = true;
            } catch (error) {
              console.error(`Failed to read component file: ${componentPath}`, error);
              return `<div class="error">Failed to load component: ${componentPath}</div>`;
            }
          }
        }
        if (!isFile) {
          let i = idx + 1;
          const content = [];
          while (i < tokens.length && !(tokens[i].type === "container_component-demo_close")) {
            if (tokens[i].content) {
              content.push(tokens[i].content);
            }
            i++;
          }
          source = content.join("\n");
        }
        const encodedSource = Buffer.from(source).toString("base64");
        return `<ComponentTabs source="${encodedSource}" filename="${filename}">${source}</ComponentTabs>
`;
      } else {
        return "</ComponentTabs>\n";
      }
    }
  });
}

// src/index.js
var __filename = fileURLToPath(import.meta.url);
var __dirname = dirname(__filename);
function vitepressComponentTabs() {
  return {
    name: "vitepress-plugin-component-tabs",
    // 提供客户端代码
    enhanceApp(ctx) {
    },
    // 扩展 Markdown
    extendMarkdown: markdownPlugin,
    // 设置别名，使插件的组件可以在 VitePress 中被引用
    alias: {
      "@vitepress-plugin-component-tabs": path2.resolve(__dirname, "./")
    },
    // 提供客户端代码
    clientConfigFile: path2.resolve(__dirname, "client.js"),
    async transform(code, id) {
      return code;
    }
  };
}
export {
  vitepressComponentTabs as default
};
