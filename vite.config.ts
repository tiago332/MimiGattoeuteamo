import { fileURLToPath, URL } from "node:url";
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// No GitHub Pages o site fica em tiago332.github.io/MimiGattoeuteamo/
export default defineConfig(({ command, isPreview }) => ({
  base: command === "build" || isPreview ? "/MimiGattoeuteamo/" : "/",
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
}));
