import { defineConfig } from 'vite'
import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import oreumIconsPlugin from './build/oreumIconsPlugin'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vuePlugin(),
    eslintPlugin(),
    oreumIconsPlugin({
      sourceFolder: './src/assets/icons',
      outputFile: './public/icons.svg'
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  },
  build: {
    sourcemap: 'inline',
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
