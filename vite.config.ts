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
      tsconfigPath: './tsconfig.app.json',
      outDir: 'dist/types',
      rollupTypes: false,
      copyDtsFiles: false,
      include: ['packages/**/*'],
      exclude: ['docs/**/*'],
    }),
  ],
  build: {
    lib: {
      entry: resolve(__dirname, 'packages/index.ts'),
      name: 'LiDaisy',
      fileName: format => `li-daisy.${format}.js`,
    },
    outDir: 'dist',
    rollupOptions: {
      external: ['vue', 'vee-validate'],
      output: {
        globals: {
          vue: 'Vue',
          'vee-validate': 'VeeValidate',
        },
        assetFileNames: 'style.css',
        exports: 'named',
      },
    },
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      '@packages': resolve(__dirname, './packages'),
    },
  },
})
