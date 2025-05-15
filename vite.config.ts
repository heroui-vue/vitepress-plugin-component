import { defineConfig} from 'vite'
import vue from "unplugin-vue/vite"


export default defineConfig({
  plugins: [vue()],
  resolve: {
    alias: {
      "@": "src/"
    }
  },
  build: {
    lib: {
      entry: ["src/client.ts", "src/markdown.ts"],
      fileName: (_, entryName) => `${entryName === "markdown" ? "index" : entryName}.js`,
      cssFileName: "styles",
      formats: ["es"],
    },
    rollupOptions: {
      external: ["vue", "highlight.js", /^node\:/]
    }
  },
})
