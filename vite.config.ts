import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import checker from "vite-plugin-checker";

// https://vite.dev/config/
export default defineConfig({
    resolve: {
        alias: {
            src: path.resolve(__dirname, "./src"),
        },
    },
    build: {
        emptyOutDir: true,
        rollupOptions: {
            output: {
                chunkFileNames: "static/js/[name]-[hash].js",
                entryFileNames: "static/js/[name]-[hash].js",

                assetFileNames: (assetInfo) => {
                    if (
                        /\.(gif|jpe?g|png|svg|webp)$/.test(
                            assetInfo.names?.[0] ?? "",
                        )
                    ) {
                        return "static/media/[name]-[hash][extname]";
                    }
                    if (/\.css$/.test(assetInfo.names?.[0] ?? "")) {
                        return "static/css/[name]-[hash][extname]";
                    }
                    return "static/[name]-[hash][extname]";
                },
                manualChunks: function manualChunks(id) {
                    //bundle every node_module entry into its own separate chunk
                    if (id.includes("node_modules")) {
                        return "vendor";
                    }
                    return null;
                },
            },
        },
    },

    plugins: [
        react(),
        checker({
            typescript: true,
            overlay: {
                initialIsOpen: false,
            },
        }),
    ],
    server: {
        port: 3000,
        strictPort: true,
        host: true,
    },
    worker: {
        format: "es",
    },
});
