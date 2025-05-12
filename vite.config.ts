import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import electron from 'vite-plugin-electron'
import renderer from 'vite-plugin-electron-renderer'
import { resolve } from 'path'

// Nạp dotenv
import * as dotenv from 'dotenv'
dotenv.config()

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron([
      {
        // Main Process
        entry: 'electron/main.ts',
        onstart(options) {
          options.startup()
        },
        vite: {
          build: {
            outDir: 'dist-electron/main',
          },
        },
      },
      {
        // Preload Scripts
        entry: 'electron/preload.ts',
        onstart(options) {
          // Lưu ý vị trí tệp khi xây dựng
          options.reload()
        },
        vite: {
          build: {
            outDir: 'dist-electron/preload',
            rollupOptions: {
              // Đảm bảo xây dựng dưới dạng CommonJS
              output: {
                format: 'cjs'
              }
            },
          },
        },
      },
    ]),
    renderer(),
  ],
  // Đồng bộ version từ package.json
  define: {
    'process.env.PACKAGE_VERSION': JSON.stringify(process.env.npm_package_version),
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
})
