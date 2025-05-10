import tseslint from "typescript-eslint";
import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright'

export default [
  {
    ignores: [
      "practice_tasks/examples.ts",
      "practice_tasks/taskssss.ts",
      "tests-examples/",
      'eslint.config.mjs',
      'mochawesome-report',
    ],
  },
  js.configs.recommended,
  ...tseslint.configs.recommendedTypeChecked,
  {
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.json'],
        tsconfigRootDir: process.cwd(),
      },
    },
    rules: {
      '@typescript-eslint/no-floating-promises': 'error',
    },
  },
  {
    files: ['tests/**'],
    ...playwright.configs['flat/recommended'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/valid-expect': 'off'
    }
  
  }
]