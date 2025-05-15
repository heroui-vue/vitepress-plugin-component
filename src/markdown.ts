import type MarkdownIt from "markdown-it";
import markdownItContainer from "markdown-it-container";
import type Token from "markdown-it/lib/token";
import { COMPONENT_NAME } from "./client";
import { Buffer } from "node:buffer";

export const CONTAINER_NAME = "component-view";

export const componentViewMarkdownPlugin: MarkdownIt.PluginSimple = (
  md: MarkdownIt,
): void => {
  // 添加自定义容器
  md.use(markdownItContainer, CONTAINER_NAME, {
    validate: (params: string) => {
      return new RegExp(`^${CONTAINER_NAME}\s{0,1}(.*)$`).test(params.trim());
    },
    render: (tokens: Token[], idx: number) => {
      const token = tokens[idx];
      const content = tokens[idx + 1].content.trim();
      const base64Content = Buffer.from(content).toString("base64");
      if (token.nesting === 1) {
        return `<${COMPONENT_NAME} source="${base64Content}">\n`;
      } else {
        return `</${COMPONENT_NAME}>`;
      }
    },
  });
};
