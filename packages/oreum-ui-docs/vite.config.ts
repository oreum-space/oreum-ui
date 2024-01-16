import * as fs from 'fs'
import { defineConfig } from 'vite'
import { resolve } from 'path'

import vuePlugin from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vuePlugin(), eslintPlugin()],
  server: {
    https: {
      key: fs.readFileSync('./cert/oreum.local.key'),
      cert: fs.readFileSync('./cert/oreum.local.crt')
    },
    host: true,
    port: 443
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src')
    }
  }
})
