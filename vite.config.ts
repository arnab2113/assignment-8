import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

export default defineConfig(({ mode }) => {
  const isLibMode = process.env.BUILD_MODE === "lib";

  return {
    plugins: [react(), tailwindcss()],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    ...(isLibMode
      ? {
          build: {
            lib: {
              entry: path.resolve(__dirname, "src/index.ts"),
              name: "EaseUI",
              fileName: (format) => `easeui.${format}.js`,
            },
            cssCodeSplit: true,
            rollupOptions: {
              external: ["react", "react-dom"],
              output: {
                globals: {
                  react: "React",
                  "react-dom": "ReactDOM",
                },
              },
            },
          },
        }
      : {
          build: {
            outDir: "dist",
          },
        }),
  };
});
