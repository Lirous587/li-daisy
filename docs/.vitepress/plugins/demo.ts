import path from 'path'
import fs from 'fs'
import container from 'markdown-it-container'

type MarkdownIt = {
  use: (plugin: any, ...params: any[]) => void
}
interface Token {
  nesting: number
  info: string
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
        const filePath = path.resolve(__dirname, `../../examples/${demoPath}.vue`)
        if (!fs.existsSync(filePath)) {
          console.error(`示例文件不存在: ${filePath}`)
          return `<div>示例文件不存在: ${demoPath}.vue</div>`
        }
        return `<Demo path="${demoPath}">`
      }
      return '</Demo>'
    },
  })
}
