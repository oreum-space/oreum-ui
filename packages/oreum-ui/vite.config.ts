import { defineConfig } from 'vite'
import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import oreumIconsPlugin from './plugins/oreumIconsPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vuePlugin(),
    eslintPlugin(),
    oreumIconsPlugin()
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    assetsInlineLimit: +false,
    lib: {
      entry: resolve(__dirname, './src/index.ts'),
      name: 'OreumUI',
      fileName: 'oreum-ui'
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        assetFileNames: (assetInfo) => assetInfo.name === 'style.css' ? 'oreum-ui.css' : assetInfo.name,
        globals: {
          vue: 'Vue'
        }
      }
    }
  }
})
