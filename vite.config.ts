import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
// Removed: import { componentTagger } from "gaurav-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  // Use base path for deployments
  base: "/",
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  define: {
    // Expose VERCEL env var to client-side code
    "import.meta.env.VERCEL": JSON.stringify(process.env.VERCEL || ""),
  },
}));
