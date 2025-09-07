import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['packages/**/*.{ts,vue}', 'docs/examples/*.{ts,vue}'],
    ignores: [
      '**/dist/**',
      '**/dist-ssr/**',
      '**/coverage/**',
      '**/.nuxt/**',
      '**/node_modules/**',
      '**/.vite/**',
      'docs/.vitepress/**',
    ],
  },

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  // 自定义规则
  {
    name: 'app/custom-rules',
    rules: {
      // Vue 相关
      'vue/multi-word-component-names': 'off', // 允许单词组件名
      'vue/no-v-html': 'off', // 允许 v-html

      // TypeScript 相关
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/no-explicit-any': 'warn', // any 类型警告而非错误

      // 允许表达式语句（包括三元运算符）
      '@typescript-eslint/no-unused-expressions': [
        'error',
        {
          allowShortCircuit: true, // 允许 a && b()
          allowTernary: true, // 允许 a ? b() : c()
          allowTaggedTemplates: true, // 允许模板字符串
        },
      ],
    },
  },

  skipFormatting
)
