import { defineConfig } from "vite-plus";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

import { fileURLToPath } from "url";
import { dirname } from "path";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    "process.env.NODE_ENV": JSON.stringify("production"),
  },
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      formats: ["iife"],
      fileName: () => "Ivy_Widgets_DiffView.js",
      name: "Ivy_Widgets_DiffView",
    },
    rolldownOptions: {
      external: ["react", "react-dom", "react/jsx-runtime"],
      output: {
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
          "react/jsx-runtime": "ReactJsxRuntime",
        },
        extend: false,
      },
    },
    outDir: "dist",
    emptyOutDir: true,
    sourcemap: true,
    cssCodeSplit: false,
  },
  test: {
    // Vitest v4 compatibility: preserve mock call history.
    // Remove after tests no longer rely on calls from setup or earlier tests.
    // https://rfc-vitest-v5-upgrade-viteplus-dev.voidzero-docs.workers.dev/guide/vitest-v5#remove-unneeded-compatibility-settings
    // https://vitest.dev/guide/migration/#clearmocks-is-enabled-by-default
    clearMocks: false,
    environment: "happy-dom",
  },
});
