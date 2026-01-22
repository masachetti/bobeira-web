import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwindcss from "@tailwindcss/vite";
import svgLoader from "vite-svg-loader";
import path from "node:path";

// https://vite.dev/config/
export default defineConfig({
  base: "/bobeira/",
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
      "@components": path.resolve(__dirname, "src/components"),
      "@views": path.resolve(__dirname, "src/views"),
      "@stores": path.resolve(__dirname, "src/stores"),
      "@assets": path.resolve(__dirname, "src/assets"),
    },
  },
  plugins: [
    vue(),
    tailwindcss(),
    svgLoader({
      // Use SVGO and keep viewBox; strip width/height so CSS controls size
      svgo: true,
      svgoConfig: {
        plugins: [
          {
            name: "preset-default",
            params: { overrides: { removeViewBox: false } },
          },
          "removeDimensions",
          "prefixIds", // avoid ID collisions if your SVG uses ids/gradients
        ],
      },
      defaultImport: "component", // allow: import Icon from './icon.svg'
    }),
  ],
});
