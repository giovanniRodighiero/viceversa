/// <reference types="vitest" />

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        port: 3000
    },
    test: {
        globals: true,
        environment: "jsdom",
        setupFiles: "./src/tools/vitestSetup.ts",
        coverage: {
            provider: "c8",
        },
        include: ['**/*.test.{js,ts,jsx,tsx}']
    }
});
