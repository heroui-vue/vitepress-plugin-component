import MarkdownIt from "markdown-it";
import markdownItContainer from "markdown-it-container";
import type Token from "markdown-it/lib/token.mjs";
import { Buffer } from "node:buffer";

export const CONTAINER_NAME = "component-view";

export const componentViewMarkdownPlugin = (md: MarkdownIt) => {
  md.use(markdownItContainer, CONTAINER_NAME, {
    validate: (params: string) => {
      return new RegExp(`^${CONTAINER_NAME}`).test(params.trim());
    },
    render: (tokens: Token[], idx: number) => {
      const token = tokens[idx];
      const content = token.meta?.componentViewSource?.trim() ?? "";
      const highlightContent =
        md.options.highlight?.(content, "html", "") ?? "";
      if (token.nesting === 1) {
        return `<ComponentView src="${Buffer.from(content).toString("base64")}" highlightedSrc="${Buffer.from(highlightContent).toString("base64")}">\n`;
      } else {
        return `</ComponentView>`;
      }
    },
  });

  md.core.ruler.after("block", "component-view-source", (state) => {
    const sourceLines = state.src.split(/\r?\n/);

    state.tokens.forEach((token) => {
      if (
        token.type !== `container_${CONTAINER_NAME}_open` ||
        token.nesting !== 1 ||
        !token.map
      ) {
        return;
      }

      const [startLine, endLine] = token.map;
      const source = sourceLines.slice(startLine + 1, endLine).join("\n");

      token.meta ??= {};
      token.meta.componentViewSource = source;
    });
  });
};
