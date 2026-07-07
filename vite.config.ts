import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// base "./" → il build funziona anche servito da una sottocartella (GitHub Pages, ecc.)
// outDir "docs" → GitHub Pages serve direttamente main:/docs, niente Actions
export default defineConfig({
  base: "./",
  plugins: [react(), tailwindcss()],
  build: { outDir: "docs" },
});
