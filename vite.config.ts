import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslint from 'vite-plugin-eslint2'
import fs from 'fs'
import { fileURLToPath } from 'node:url'

const configs: Record<string, UserConfig> = {
  lib: {
    build: {
      lib: {
        entry: './src/lib/index.ts',
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
    port: 443
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@lib': fileURLToPath(new URL('./src/lib', import.meta.url))
    }
  },
  plugins: [vue(), eslint()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  },
  ...configs[mode]
}))
