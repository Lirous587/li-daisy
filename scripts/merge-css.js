import { readFileSync, writeFileSync, unlinkSync, existsSync } from 'fs'
import { resolve } from 'path'

const dist = resolve(process.cwd(), 'dist')

// 读取 Tailwind CSS
const tailwindPath = resolve(dist, 'tailwind.css')
let tailwindCSS = ''
if (existsSync(tailwindPath)) {
  tailwindCSS = readFileSync(tailwindPath, 'utf-8')
  console.log('✓ 读取 tailwind.css')
}

// 读取组件 CSS
const componentsPath = resolve(dist, 'components.css')
let componentsCSS = ''
if (existsSync(componentsPath)) {
  componentsCSS = readFileSync(componentsPath, 'utf-8')
  console.log('✓ 读取 components.css')
}

// 合并成 style.css
const finalCSS = tailwindCSS + '\n' + componentsCSS
writeFileSync(resolve(dist, 'style.css'), finalCSS)
console.log('✓ 合并完成 → dist/style.css')

// 删除临时文件
if (existsSync(tailwindPath)) {
  unlinkSync(tailwindPath)
  console.log('✓ 删除 tailwind.css')
}
if (existsSync(componentsPath)) {
  unlinkSync(componentsPath)
  console.log('✓ 删除 components.css')
}
if (existsSync(resolve(dist, 'temp.js'))) {
  unlinkSync(resolve(dist, 'temp.js'))
  console.log('✓ 删除 temp.js')
}

console.log('\n✅ CSS 打包完成!')
