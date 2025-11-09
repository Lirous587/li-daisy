import container from 'markdown-it-container'
import fs from 'fs'
import path from 'path'

type MarkdownIt = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  use: (plugin: any, ...params: any[]) => void
  render: (src: string) => string
}

interface Token {
  nesting: number
  info: string
  type: string
  children?: Array<{ content: string }>
}

export function demoBlockPlugin(md: MarkdownIt): void {
  md.use(container, 'demo', {
    validate(params: string) {
      return /^demo\s+\S+/.test(params.trim())
    },
    render(tokens: Token[], idx: number) {
      const token = tokens[idx]
      if (token.nesting === 1) {
        const match = /^demo\s+(\S+)/.exec(token.info.trim())
        if (!match) return ''

        const demoPath = match[1]
        const examplesRoot = path.resolve(process.cwd(), 'docs/examples')
        const filePath = path.resolve(examplesRoot, `${demoPath}.vue`)

        let source = ''
        try {
          source = fs.readFileSync(filePath, 'utf-8')
        } catch (err) {
          console.error(`读取示例文件失败: ${filePath}`, err)
        }

        const componentName = `demo-${demoPath.replace(/\//g, '-')}`

        // 使用 md.render 直接渲染代码块,得到高亮后的 HTML
        const highlightedCode = md.render('```vue\n' + source + '\n```')

        return `<Demo path="${demoPath}">
  <template #source><${componentName} /></template>
  <template #rawSource>${highlightedCode}</template>`
      } else {
        return '</Demo>\n'
      }
    },
  })
}
