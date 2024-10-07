// @ts-check

import js from '@eslint/js'
import vue from 'eslint-plugin-vue'
import ts from 'typescript-eslint'

const ignores = ['.cert/*', 'dist/**/*', 'dist-docs/**/*']
const error = 'error'

export default ts.config(
  ...[
    js.configs.recommended,
    ...ts.configs.recommended,
    ...vue.configs['flat/recommended'],
    {
      ignores,
      files: [
        '*.vue', '**/*.vue',
        '*.ts', '**/*.ts'
      ],
      languageOptions: {
        parserOptions: {
          parser: '@typescript-eslint/parser'
        }
      },
      rules: {
        'semi': [error, 'never'],
        'indent': [error, 2, { 'SwitchCase': 1 }],
        'no-unexpected-multiline': error,
        'array-bracket-newline': [error, { 'multiline': true }],
        'arrow-spacing': error,
        'block-spacing': error,
        'brace-style': [error, '1tbs', { 'allowSingleLine': true }],
        'padded-blocks': [error, 'never'],
        'comma-dangle': [error, 'never'],
        'comma-spacing': error,
        'computed-property-spacing': error,
        'quotes': [error, 'single'],
        'rest-spread-spacing': [error, 'never'],
        'space-before-blocks': error,
        'keyword-spacing': error,
        'space-before-function-paren': [error, {
          'anonymous': 'always',
          'named': 'always',
          'asyncArrow': 'always'
        }],
        'space-in-parens': [error, 'never'],
        'space-infix-ops': error,
        'space-unary-ops': error,
        'switch-colon-spacing': [error, { 'before': false, 'after': true }],
        'template-curly-spacing': [error, 'always'],
        'wrap-iife': [error, 'any'],
        'wrap-regex': error,

        // TypeScript
        'no-unused-vars': 'off',
        '@typescript-eslint/no-unused-vars': [error, {
          'args': 'none',
          'ignoreRestSiblings': true
        }],
        '@typescript-eslint/consistent-generic-constructors': [error, 'constructor'],

        // Vue
        'vue/html-indent': [error, 2, {
          'baseIndent': 1,
          'attribute': 1,
          'closeBracket': 0,
          'alignAttributesVertically': true,
          'ignores': []
        }],
        'vue/html-self-closing': [error, {
          'html': {
            'void': 'never',
            'normal': 'always',
            'component': 'always'
          },
          'svg': 'always',
          'math': 'always'
        }],
        'vue/template-curly-spacing': [error, 'always'],
        'vue/require-prop-types': error,
        'vue/prop-name-casing': [error, 'camelCase'],
        'vue/component-name-in-template-casing': [error, 'kebab-case'],
        'vue/component-definition-name-casing': [error, 'PascalCase'],
        'vue/padding-line-between-blocks': error,
        'vue/custom-event-name-casing': [error, 'camelCase'],
        'vue/max-attributes-per-line': [error, {
          'singleline': {
            'max': 3
          },
          'multiline': {
            'max': 1
          }
        }],
        'vue/multi-word-component-names': error,
        'vue/no-multi-spaces': error,
        'vue/v-on-event-hyphenation': error,
        'vue/attribute-hyphenation': error,
        'vue/valid-v-slot': error,
        'vue/no-ref-object-destructure': error,
        "vue/no-setup-props-destructure": 'off'
      }
    }
  ].map((config) => ({ ...config, ignores }))
)
