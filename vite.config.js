import path from 'path';
import { defineConfig } from 'vite';
import viteReact from '@vitejs/plugin-react';
import { patchCssModules } from 'vite-css-modules';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [viteReact(), patchCssModules()],
    test: {
        globals: true,
        environment: 'jsdom',
        setupFiles: './vitest.setup.ts', // assuming the test folder is in the root of our project
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
