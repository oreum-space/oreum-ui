/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_DEFAULT_TITLE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}