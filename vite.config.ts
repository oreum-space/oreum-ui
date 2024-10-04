import { defineConfig, UserConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'

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
    port: 443
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@lib': path.resolve(__dirname, './src/lib')
    }
  },
  plugins: [vue()],
  css: {
    preprocessorOptions: {
      scss: {
        api: 'modern'
      }
    }
  },
  ...configs[mode]
}))
