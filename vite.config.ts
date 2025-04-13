import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
import dts from 'vite-plugin-dts'

export default defineConfig({
  plugins: [
    tailwindcss(),
    vue(),
    dts({
      tsconfigPath: './tsconfig.json',
      outDir: 'dist/types',
      include: ['packages/**/*.ts', 'packages/**/*.d.ts', 'packages/**/*.vue'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'LiDaisy',
      fileName: (format) => `li-daisy.${format}.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'vue-router'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          'vue-router': 'VueRouter',
        },
        assetFileNames: 'style.css',
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './packages'),
      '@examples': resolve(__dirname, './examples'),
    },
  },
})
