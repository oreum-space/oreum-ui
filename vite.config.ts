import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'

const configs: Record<string, UserConfig> = {
  lib: {
    build: {
      lib: {
        entry: './src/lib/oreum-ui.ts',
        name: 'OreumUI',
        fileName: 'oreum-ui'
      },
      rollupOptions: {
        external: ['vue'],
        output: {
          globals: {
            vue: 'Vue'
          }
        }
      }
    }
  },
  app: {
    build: {
      outDir: 'dist-docs'
    }
  }
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    https: {
      key: fs.readFileSync('./.cert/oreum.local.key'),
      cert: fs.readFileSync('./.cert/oreum.local.crt')
    },
    host: true,
    port: 443 // 7443
  },
  plugins: [vue()],
  ...configs[mode]
}))
