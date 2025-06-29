import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      manifest: {
        name: "Learnary",
        short_name: "Learnary",
        description: "A Progressive Web App for tracking the learnings",
        theme_color: "#000",
        background_color: "#000",
        display: "standalone",
        start_url: "/collection",
        id: "/collection",
        icons: [
          {
            src: "pwa.png",
            sizes: "196x196",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
