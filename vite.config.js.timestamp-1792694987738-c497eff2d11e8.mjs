// vite.config.js
import path from "path";
import { fileURLToPath } from "url";
import { defineConfig } from "file:///C:/Users/LENOVO/Desktop/Project/Traverse-Globe/node_modules/vite/dist/node/index.js";
import react from "file:///C:/Users/LENOVO/Desktop/Project/Traverse-Globe/node_modules/@vitejs/plugin-react/dist/index.js";
import { VitePWA } from "file:///C:/Users/LENOVO/Desktop/Project/Traverse-Globe/node_modules/vite-plugin-pwa/dist/index.js";
import viteCompression from "file:///C:/Users/LENOVO/Desktop/Project/Traverse-Globe/node_modules/vite-plugin-compression/dist/index.mjs";
import { visualizer } from "file:///C:/Users/LENOVO/Desktop/Project/Traverse-Globe/node_modules/rollup-plugin-visualizer/dist/plugin/index.js";
import dotenv from "file:///C:/Users/LENOVO/Desktop/Project/Traverse-Globe/node_modules/dotenv/lib/main.js";
var __vite_injected_original_import_meta_url = "file:///C:/Users/LENOVO/Desktop/Project/Traverse-Globe/vite.config.js";
var __dirname = path.dirname(fileURLToPath(__vite_injected_original_import_meta_url));
dotenv.config();
function localLeadWebhookApi() {
  return {
    name: "local-lead-webhook-api",
    configureServer(server) {
      server.middlewares.use("/api/lead-webhook", async (req, res, next) => {
        if (req.method !== "POST") {
          return next();
        }
        try {
          const webhookUrl = process.env.LEAD_WEBHOOK_URL;
          if (!webhookUrl) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: "LEAD_WEBHOOK_URL is not configured in .env" }));
            return;
          }
          let rawBody = "";
          req.on("data", (chunk) => {
            rawBody += chunk;
          });
          await new Promise((resolve, reject) => {
            req.on("end", resolve);
            req.on("error", reject);
          });
          const payload = rawBody ? JSON.parse(rawBody) : {};
          const headers = {
            "Content-Type": "application/json"
          };
          if (process.env.LEAD_WEBHOOK_SECRET) {
            headers["x-webhook-secret"] = process.env.LEAD_WEBHOOK_SECRET;
          }
          const webhookResponse = await fetch(webhookUrl, {
            method: "POST",
            headers,
            body: JSON.stringify({
              source: "Traverse Globe Website Popup",
              submittedAt: (/* @__PURE__ */ new Date()).toISOString(),
              ...payload
            })
          });
          if (!webhookResponse.ok) {
            const errorBody = await webhookResponse.text();
            res.statusCode = 502;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ error: `Webhook forward failed: ${errorBody || webhookResponse.status}` }));
            return;
          }
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: true }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ error: `Failed to process lead webhook request: ${error?.message || "unknown error"}` }));
        }
      });
    }
  };
}
var vite_config_default = defineConfig(({ isSsrBuild }) => ({
  plugins: [
    localLeadWebhookApi(),
    // injectCSPMetaTag(), // Disabled - CSP handled by .htaccess
    react({
      babel: {
        plugins: [
          // Remove prop-types in production
          ["transform-react-remove-prop-types", { removeImport: true }]
        ]
      }
    }),
    // Gzip compression DISABLED - FTP servers have issues with pre-compressed files
    // Use server-side compression (mod_deflate) instead
    // viteCompression({
    //   algorithm: 'gzip',
    //   ext: '.gz',
    //   threshold: 1024,
    //   deleteOriginFile: false,
    //   filter: /\.(js|mjs|json|css|html|svg)$/i
    // }),
    // Brotli compression DISABLED - FTP servers have issues with pre-compressed files
    // Use server-side compression (mod_deflate) instead
    // viteCompression({
    //   algorithm: 'brotliCompress',
    //   ext: '.br',
    //   threshold: 1024,
    //   deleteOriginFile: false,
    //   filter: /\.(js|mjs|json|css|html|svg)$/i
    // }),
    // Bundle analyzer (only in analyze mode)
    process.env.ANALYZE && visualizer({
      open: true,
      gzipSize: true,
      brotliSize: true,
      filename: "dist/stats.html"
    })
    // PWA plugin completely disabled to prevent aggressive caching issues
    // VitePWA({...})
  ].filter(Boolean),
  build: {
    // Enable code splitting
    rollupOptions: {
      output: {
        manualChunks: isSsrBuild ? void 0 : {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          // framer-motion and lucide are needed by the eager Header, so they are
          // critical. Swiper is not - leaving it unlisted lets it ride along with the
          // lazy carousel sections instead of being modulepreloaded on every page.
          "vendor-motion": ["framer-motion"],
          "vendor-icons": ["lucide-react"],
          "vendor-utils": ["@tanstack/react-query", "clsx", "tailwind-merge", "class-variance-authority"]
        },
        // Optimize chunk naming for better caching
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg|webp)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]";
          }
          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]";
          }
          if (/\.(woff|woff2|ttf|eot)$/.test(name ?? "")) {
            return "assets/fonts/[name]-[hash][extname]";
          }
          return "assets/[name]-[hash][extname]";
        }
      }
    },
    // Optimize chunk size
    chunkSizeWarningLimit: 400,
    // Use terser for better minification
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        // Remove console logs
        drop_debugger: true,
        pure_funcs: ["console.log", "console.info", "console.debug"],
        passes: 2
      },
      mangle: {
        safari10: true
      },
      format: {
        comments: false
      }
    },
    // Source maps for production debugging (disabled for smaller bundles)
    sourcemap: false,
    // CSS code splitting
    cssCodeSplit: true,
    // Report compressed size
    reportCompressedSize: true,
    // Target modern browsers for smaller bundles
    target: "es2020"
  },
  // Optimize dependencies
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "framer-motion",
      "swiper"
    ]
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  // Server configuration
  server: {
    port: 5173,
    strictPort: false,
    // If 5173 taken, Vite auto-bumps to 5174 — remember to whitelist that in Sanity CORS
    hmr: {
      overlay: false
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMRU5PVk9cXFxcRGVza3RvcFxcXFxQcm9qZWN0XFxcXFRyYXZlcnNlLUdsb2JlXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxMRU5PVk9cXFxcRGVza3RvcFxcXFxQcm9qZWN0XFxcXFRyYXZlcnNlLUdsb2JlXFxcXHZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9DOi9Vc2Vycy9MRU5PVk8vRGVza3RvcC9Qcm9qZWN0L1RyYXZlcnNlLUdsb2JlL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHBhdGggZnJvbSAncGF0aCdcbmltcG9ydCB7IGZpbGVVUkxUb1BhdGggfSBmcm9tICd1cmwnXG5pbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJ1xuaW1wb3J0IHJlYWN0IGZyb20gJ0B2aXRlanMvcGx1Z2luLXJlYWN0J1xuaW1wb3J0IHsgVml0ZVBXQSB9IGZyb20gJ3ZpdGUtcGx1Z2luLXB3YSdcbmltcG9ydCB2aXRlQ29tcHJlc3Npb24gZnJvbSAndml0ZS1wbHVnaW4tY29tcHJlc3Npb24nXG5pbXBvcnQgeyB2aXN1YWxpemVyIH0gZnJvbSAncm9sbHVwLXBsdWdpbi12aXN1YWxpemVyJ1xuaW1wb3J0IGRvdGVudiBmcm9tICdkb3RlbnYnXG5cbmNvbnN0IF9fZGlybmFtZSA9IHBhdGguZGlybmFtZShmaWxlVVJMVG9QYXRoKGltcG9ydC5tZXRhLnVybCkpXG5cbmRvdGVudi5jb25maWcoKVxuXG5mdW5jdGlvbiBsb2NhbExlYWRXZWJob29rQXBpKCkge1xuICByZXR1cm4ge1xuICAgIG5hbWU6ICdsb2NhbC1sZWFkLXdlYmhvb2stYXBpJyxcbiAgICBjb25maWd1cmVTZXJ2ZXIoc2VydmVyKSB7XG4gICAgICBzZXJ2ZXIubWlkZGxld2FyZXMudXNlKCcvYXBpL2xlYWQtd2ViaG9vaycsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICAgICAgICBpZiAocmVxLm1ldGhvZCAhPT0gJ1BPU1QnKSB7XG4gICAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3Qgd2ViaG9va1VybCA9IHByb2Nlc3MuZW52LkxFQURfV0VCSE9PS19VUkw7XG4gICAgICAgICAgaWYgKCF3ZWJob29rVXJsKSB7XG4gICAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgICAgIHJlcy5zZXRIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9qc29uJyk7XG4gICAgICAgICAgICByZXMuZW5kKEpTT04uc3RyaW5naWZ5KHsgZXJyb3I6ICdMRUFEX1dFQkhPT0tfVVJMIGlzIG5vdCBjb25maWd1cmVkIGluIC5lbnYnIH0pKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBsZXQgcmF3Qm9keSA9ICcnO1xuICAgICAgICAgIHJlcS5vbignZGF0YScsIChjaHVuaykgPT4ge1xuICAgICAgICAgICAgcmF3Qm9keSArPSBjaHVuaztcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGF3YWl0IG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICAgIHJlcS5vbignZW5kJywgcmVzb2x2ZSk7XG4gICAgICAgICAgICByZXEub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IHBheWxvYWQgPSByYXdCb2R5ID8gSlNPTi5wYXJzZShyYXdCb2R5KSA6IHt9O1xuXG4gICAgICAgICAgY29uc3QgaGVhZGVycyA9IHtcbiAgICAgICAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbidcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgaWYgKHByb2Nlc3MuZW52LkxFQURfV0VCSE9PS19TRUNSRVQpIHtcbiAgICAgICAgICAgIGhlYWRlcnNbJ3gtd2ViaG9vay1zZWNyZXQnXSA9IHByb2Nlc3MuZW52LkxFQURfV0VCSE9PS19TRUNSRVQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3Qgd2ViaG9va1Jlc3BvbnNlID0gYXdhaXQgZmV0Y2god2ViaG9va1VybCwge1xuICAgICAgICAgICAgbWV0aG9kOiAnUE9TVCcsXG4gICAgICAgICAgICBoZWFkZXJzLFxuICAgICAgICAgICAgYm9keTogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgICBzb3VyY2U6ICdUcmF2ZXJzZSBHbG9iZSBXZWJzaXRlIFBvcHVwJyxcbiAgICAgICAgICAgICAgc3VibWl0dGVkQXQ6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICAgICAgICAgICAgLi4ucGF5bG9hZFxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGlmICghd2ViaG9va1Jlc3BvbnNlLm9rKSB7XG4gICAgICAgICAgICBjb25zdCBlcnJvckJvZHkgPSBhd2FpdCB3ZWJob29rUmVzcG9uc2UudGV4dCgpO1xuICAgICAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA1MDI7XG4gICAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgICAgcmVzLmVuZChKU09OLnN0cmluZ2lmeSh7IGVycm9yOiBgV2ViaG9vayBmb3J3YXJkIGZhaWxlZDogJHtlcnJvckJvZHkgfHwgd2ViaG9va1Jlc3BvbnNlLnN0YXR1c31gIH0pKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDIwMDtcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBzdWNjZXNzOiB0cnVlIH0pKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDUwMDtcbiAgICAgICAgICByZXMuc2V0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbicpO1xuICAgICAgICAgIHJlcy5lbmQoSlNPTi5zdHJpbmdpZnkoeyBlcnJvcjogYEZhaWxlZCB0byBwcm9jZXNzIGxlYWQgd2ViaG9vayByZXF1ZXN0OiAke2Vycm9yPy5tZXNzYWdlIHx8ICd1bmtub3duIGVycm9yJ31gIH0pKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG4vLyBDdXN0b20gcGx1Z2luIHRvIGluamVjdCBDU1AgbWV0YSB0YWcgLSBESVNBQkxFRFxuLy8gQ1NQIGlzIG5vdyBoYW5kbGVkIGJ5IC5odGFjY2VzcyB0byBhdm9pZCBjb25mbGljdHNcbi8vIGZ1bmN0aW9uIGluamVjdENTUE1ldGFUYWcoKSB7XG4vLyAgIHJldHVybiB7XG4vLyAgICAgbmFtZTogJ2luamVjdC1jc3AtbWV0YScsXG4vLyAgICAgdHJhbnNmb3JtSW5kZXhIdG1sKGh0bWwpIHtcbi8vICAgICAgIC8vIEFkZCBDU1AgbWV0YSB0YWcgZm9yIGFkZGl0aW9uYWwgc2VjdXJpdHlcbi8vICAgICAgIHJldHVybiBodG1sLnJlcGxhY2UoXG4vLyAgICAgICAgICc8bWV0YSBjaGFyc2V0PVwiVVRGLThcIiAvPicsXG4vLyAgICAgICAgIGA8bWV0YSBjaGFyc2V0PVwiVVRGLThcIiAvPlxuLy8gICAgIDxtZXRhIGh0dHAtZXF1aXY9XCJDb250ZW50LVNlY3VyaXR5LVBvbGljeVwiIGNvbnRlbnQ9XCJ1cGdyYWRlLWluc2VjdXJlLXJlcXVlc3RzXCI+YFxuLy8gICAgICAgKTtcbi8vICAgICB9XG4vLyAgIH1cbi8vIH1cblxuLy8gaHR0cHM6Ly92aXRlLmRldi9jb25maWcvXG4vLyBgaXNTc3JCdWlsZGAgaXMgdGhlIGJ1aWxkLXRpbWUgcHJlLXJlbmRlciBidW5kbGUgKHNjcmlwdHMvcHJlcmVuZGVyLm1qcykuIEl0IGtlZXBzXG4vLyBub2RlX21vZHVsZXMgZXh0ZXJuYWwsIHNvIHRoZSBicm93c2VyIGNodW5rIHNwbGl0IGJlbG93IGRvZXMgbm90IGFwcGx5IHRvIGl0LlxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IGlzU3NyQnVpbGQgfSkgPT4gKHtcbiAgcGx1Z2luczogW1xuICAgIGxvY2FsTGVhZFdlYmhvb2tBcGkoKSxcbiAgICAvLyBpbmplY3RDU1BNZXRhVGFnKCksIC8vIERpc2FibGVkIC0gQ1NQIGhhbmRsZWQgYnkgLmh0YWNjZXNzXG4gICAgcmVhY3Qoe1xuICAgICAgYmFiZWw6IHtcbiAgICAgICAgcGx1Z2luczogW1xuICAgICAgICAgIC8vIFJlbW92ZSBwcm9wLXR5cGVzIGluIHByb2R1Y3Rpb25cbiAgICAgICAgICBbJ3RyYW5zZm9ybS1yZWFjdC1yZW1vdmUtcHJvcC10eXBlcycsIHsgcmVtb3ZlSW1wb3J0OiB0cnVlIH1dXG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KSxcbiAgICBcbiAgICAvLyBHemlwIGNvbXByZXNzaW9uIERJU0FCTEVEIC0gRlRQIHNlcnZlcnMgaGF2ZSBpc3N1ZXMgd2l0aCBwcmUtY29tcHJlc3NlZCBmaWxlc1xuICAgIC8vIFVzZSBzZXJ2ZXItc2lkZSBjb21wcmVzc2lvbiAobW9kX2RlZmxhdGUpIGluc3RlYWRcbiAgICAvLyB2aXRlQ29tcHJlc3Npb24oe1xuICAgIC8vICAgYWxnb3JpdGhtOiAnZ3ppcCcsXG4gICAgLy8gICBleHQ6ICcuZ3onLFxuICAgIC8vICAgdGhyZXNob2xkOiAxMDI0LFxuICAgIC8vICAgZGVsZXRlT3JpZ2luRmlsZTogZmFsc2UsXG4gICAgLy8gICBmaWx0ZXI6IC9cXC4oanN8bWpzfGpzb258Y3NzfGh0bWx8c3ZnKSQvaVxuICAgIC8vIH0pLFxuICAgIFxuICAgIC8vIEJyb3RsaSBjb21wcmVzc2lvbiBESVNBQkxFRCAtIEZUUCBzZXJ2ZXJzIGhhdmUgaXNzdWVzIHdpdGggcHJlLWNvbXByZXNzZWQgZmlsZXNcbiAgICAvLyBVc2Ugc2VydmVyLXNpZGUgY29tcHJlc3Npb24gKG1vZF9kZWZsYXRlKSBpbnN0ZWFkXG4gICAgLy8gdml0ZUNvbXByZXNzaW9uKHtcbiAgICAvLyAgIGFsZ29yaXRobTogJ2Jyb3RsaUNvbXByZXNzJyxcbiAgICAvLyAgIGV4dDogJy5icicsXG4gICAgLy8gICB0aHJlc2hvbGQ6IDEwMjQsXG4gICAgLy8gICBkZWxldGVPcmlnaW5GaWxlOiBmYWxzZSxcbiAgICAvLyAgIGZpbHRlcjogL1xcLihqc3xtanN8anNvbnxjc3N8aHRtbHxzdmcpJC9pXG4gICAgLy8gfSksXG4gICAgXG4gICAgLy8gQnVuZGxlIGFuYWx5emVyIChvbmx5IGluIGFuYWx5emUgbW9kZSlcbiAgICBwcm9jZXNzLmVudi5BTkFMWVpFICYmIHZpc3VhbGl6ZXIoe1xuICAgICAgb3BlbjogdHJ1ZSxcbiAgICAgIGd6aXBTaXplOiB0cnVlLFxuICAgICAgYnJvdGxpU2l6ZTogdHJ1ZSxcbiAgICAgIGZpbGVuYW1lOiAnZGlzdC9zdGF0cy5odG1sJ1xuICAgIH0pLFxuICAgIFxuICAgIC8vIFBXQSBwbHVnaW4gY29tcGxldGVseSBkaXNhYmxlZCB0byBwcmV2ZW50IGFnZ3Jlc3NpdmUgY2FjaGluZyBpc3N1ZXNcbiAgICAvLyBWaXRlUFdBKHsuLi59KVxuICBdLmZpbHRlcihCb29sZWFuKSxcbiAgXG4gIGJ1aWxkOiB7XG4gICAgLy8gRW5hYmxlIGNvZGUgc3BsaXR0aW5nXG4gICAgcm9sbHVwT3B0aW9uczoge1xuICAgICAgb3V0cHV0OiB7XG4gICAgICAgIG1hbnVhbENodW5rczogaXNTc3JCdWlsZCA/IHVuZGVmaW5lZCA6IHtcbiAgICAgICAgICAndmVuZG9yLXJlYWN0JzogWydyZWFjdCcsICdyZWFjdC1kb20nLCAncmVhY3Qtcm91dGVyLWRvbSddLFxuICAgICAgICAgIC8vIGZyYW1lci1tb3Rpb24gYW5kIGx1Y2lkZSBhcmUgbmVlZGVkIGJ5IHRoZSBlYWdlciBIZWFkZXIsIHNvIHRoZXkgYXJlXG4gICAgICAgICAgLy8gY3JpdGljYWwuIFN3aXBlciBpcyBub3QgLSBsZWF2aW5nIGl0IHVubGlzdGVkIGxldHMgaXQgcmlkZSBhbG9uZyB3aXRoIHRoZVxuICAgICAgICAgIC8vIGxhenkgY2Fyb3VzZWwgc2VjdGlvbnMgaW5zdGVhZCBvZiBiZWluZyBtb2R1bGVwcmVsb2FkZWQgb24gZXZlcnkgcGFnZS5cbiAgICAgICAgICAndmVuZG9yLW1vdGlvbic6IFsnZnJhbWVyLW1vdGlvbiddLFxuICAgICAgICAgICd2ZW5kb3ItaWNvbnMnOiBbJ2x1Y2lkZS1yZWFjdCddLFxuICAgICAgICAgICd2ZW5kb3ItdXRpbHMnOiBbJ0B0YW5zdGFjay9yZWFjdC1xdWVyeScsICdjbHN4JywgJ3RhaWx3aW5kLW1lcmdlJywgJ2NsYXNzLXZhcmlhbmNlLWF1dGhvcml0eSddXG4gICAgICAgIH0sXG4gICAgICAgIC8vIE9wdGltaXplIGNodW5rIG5hbWluZyBmb3IgYmV0dGVyIGNhY2hpbmdcbiAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvanMvW25hbWVdLVtoYXNoXS5qcycsXG4gICAgICAgIGVudHJ5RmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBhc3NldEZpbGVOYW1lczogKHsgbmFtZSB9KSA9PiB7XG4gICAgICAgICAgaWYgKC9cXC4oZ2lmfGpwZT9nfHBuZ3xzdmd8d2VicCkkLy50ZXN0KG5hbWUgPz8gJycpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2Fzc2V0cy9pbWFnZXMvW25hbWVdLVtoYXNoXVtleHRuYW1lXSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICgvXFwuY3NzJC8udGVzdChuYW1lID8/ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdhc3NldHMvY3NzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoL1xcLih3b2ZmfHdvZmYyfHR0Znxlb3QpJC8udGVzdChuYW1lID8/ICcnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdhc3NldHMvZm9udHMvW25hbWVdLVtoYXNoXVtleHRuYW1lXSc7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAnYXNzZXRzL1tuYW1lXS1baGFzaF1bZXh0bmFtZV0nO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICAvLyBPcHRpbWl6ZSBjaHVuayBzaXplXG4gICAgY2h1bmtTaXplV2FybmluZ0xpbWl0OiA0MDAsXG4gICAgLy8gVXNlIHRlcnNlciBmb3IgYmV0dGVyIG1pbmlmaWNhdGlvblxuICAgIG1pbmlmeTogJ3RlcnNlcicsXG4gICAgdGVyc2VyT3B0aW9uczoge1xuICAgICAgY29tcHJlc3M6IHtcbiAgICAgICAgZHJvcF9jb25zb2xlOiB0cnVlLCAvLyBSZW1vdmUgY29uc29sZSBsb2dzXG4gICAgICAgIGRyb3BfZGVidWdnZXI6IHRydWUsXG4gICAgICAgIHB1cmVfZnVuY3M6IFsnY29uc29sZS5sb2cnLCAnY29uc29sZS5pbmZvJywgJ2NvbnNvbGUuZGVidWcnXSxcbiAgICAgICAgcGFzc2VzOiAyXG4gICAgICB9LFxuICAgICAgbWFuZ2xlOiB7XG4gICAgICAgIHNhZmFyaTEwOiB0cnVlXG4gICAgICB9LFxuICAgICAgZm9ybWF0OiB7XG4gICAgICAgIGNvbW1lbnRzOiBmYWxzZVxuICAgICAgfVxuICAgIH0sXG4gICAgLy8gU291cmNlIG1hcHMgZm9yIHByb2R1Y3Rpb24gZGVidWdnaW5nIChkaXNhYmxlZCBmb3Igc21hbGxlciBidW5kbGVzKVxuICAgIHNvdXJjZW1hcDogZmFsc2UsXG4gICAgLy8gQ1NTIGNvZGUgc3BsaXR0aW5nXG4gICAgY3NzQ29kZVNwbGl0OiB0cnVlLFxuICAgIC8vIFJlcG9ydCBjb21wcmVzc2VkIHNpemVcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogdHJ1ZSxcbiAgICAvLyBUYXJnZXQgbW9kZXJuIGJyb3dzZXJzIGZvciBzbWFsbGVyIGJ1bmRsZXNcbiAgICB0YXJnZXQ6ICdlczIwMjAnXG4gIH0sXG4gIFxuICAvLyBPcHRpbWl6ZSBkZXBlbmRlbmNpZXNcbiAgb3B0aW1pemVEZXBzOiB7XG4gICAgaW5jbHVkZTogW1xuICAgICAgJ3JlYWN0JywgXG4gICAgICAncmVhY3QtZG9tJywgXG4gICAgICAncmVhY3Qtcm91dGVyLWRvbScsXG4gICAgICAnZnJhbWVyLW1vdGlvbicsXG4gICAgICAnc3dpcGVyJ1xuICAgIF1cbiAgfSxcbiAgXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IHBhdGgucmVzb2x2ZShfX2Rpcm5hbWUsIFwiLi9zcmNcIiksXG4gICAgfSxcbiAgfSxcblxuICAvLyBTZXJ2ZXIgY29uZmlndXJhdGlvblxuICBzZXJ2ZXI6IHtcbiAgICBwb3J0OiA1MTczLFxuICAgIHN0cmljdFBvcnQ6IGZhbHNlLCAvLyBJZiA1MTczIHRha2VuLCBWaXRlIGF1dG8tYnVtcHMgdG8gNTE3NCBcdTIwMTQgcmVtZW1iZXIgdG8gd2hpdGVsaXN0IHRoYXQgaW4gU2FuaXR5IENPUlNcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlXG4gICAgfVxuICB9XG59KSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBd1UsT0FBTyxVQUFVO0FBQ3pWLFNBQVMscUJBQXFCO0FBQzlCLFNBQVMsb0JBQW9CO0FBQzdCLE9BQU8sV0FBVztBQUNsQixTQUFTLGVBQWU7QUFDeEIsT0FBTyxxQkFBcUI7QUFDNUIsU0FBUyxrQkFBa0I7QUFDM0IsT0FBTyxZQUFZO0FBUDRMLElBQU0sMkNBQTJDO0FBU2hRLElBQU0sWUFBWSxLQUFLLFFBQVEsY0FBYyx3Q0FBZSxDQUFDO0FBRTdELE9BQU8sT0FBTztBQUVkLFNBQVMsc0JBQXNCO0FBQzdCLFNBQU87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
