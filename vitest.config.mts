import tsconfigPaths from "vite-tsconfig-paths";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [tsconfigPaths()],
  // Match Next.js: JSX without importing React.
  esbuild: { jsx: "automatic" },
  test: {
    include: ["tests/**/*.test.ts"],
    environment: "node",
  },
});
