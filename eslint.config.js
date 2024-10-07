// @ts-check

import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'

const ignores = ['.cert/*', 'dist/**/*', 'dist-docs/**/*']

export default ts.config(
  ...[js.configs.recommended,
  ...ts.configs.recommended,
  ...vue.configs['flat/recommended'],
  {
    ignores,
    files: ['*.vue', '**/*.vue'],
    languageOptions: {
      parserOptions: {
        parser: '@typescript-eslint/parser'
      }
    }
  }].map((config) => ({ ...config, ignores }))
)
