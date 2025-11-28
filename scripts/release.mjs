import prompts from 'prompts'
import { execSync } from 'child_process'
import pc from 'picocolors'
import fs from 'fs'

// --- 配置 ---
const buildCommand = 'pnpm run build-only'
// ---

// 辅助函数：运行命令并打印
function run(command) {
  console.log(pc.cyan(`$ ${command}`))
  execSync(command, { stdio: 'inherit' })
}

// 辅助函数：退出脚本
function exit(message) {
  console.error(pc.red(message))
  process.exit(1)
}

async function main() {
  // 1. 检查 Git 工作区是否干净
  const gitStatus = execSync('git status --porcelain').toString().trim()
  if (gitStatus) {
    exit('Git working directory is not clean. Please commit or stash your changes.')
  }

  // 2. 交互式地询问版本类型
  const { releaseType } = await prompts({
    type: 'select',
    name: 'releaseType',
    message: 'Select release type:',
    choices: [
      { title: 'Patch (e.g., 3.0.12 -> 3.0.13)', value: 'patch' },
      { title: 'Minor (e.g., 3.0.12 -> 3.1.0)', value: 'minor' },
      { title: 'Major (e.g., 3.0.12 -> 4.0.0)', value: 'major' },
      { title: 'Prerelease (e.g., 3.0.12 -> 3.0.13-beta.0)', value: 'prerelease' },
    ],
  })

  if (!releaseType) exit('No release type selected.')

  let preid = 'beta'
  if (releaseType === 'prerelease') {
    const { preid: customPreid } = await prompts({
      type: 'text',
      name: 'preid',
      message: 'Enter prerelease identifier (e.g., beta, alpha, rc):',
      initial: 'beta',
    })
    if (!customPreid) exit('Prerelease identifier is required.')
    preid = customPreid
  }

  // 3. 更新版本号
  const versionCommand = `pnpm version ${releaseType} ${releaseType === 'prerelease' ? `--preid=${preid}` : ''}`
  run(versionCommand)

  // 读取更新后的 package.json 以获取新版本号
  const { version: newVersion } = JSON.parse(fs.readFileSync('package.json', 'utf-8'))

  // 4. 最终确认
  const { confirm } = await prompts({
    type: 'confirm',
    name: 'confirm',
    message: `Ready to build and publish version ${pc.yellow(newVersion)}?`,
    initial: true,
  })

  if (!confirm) exit('Publish cancelled.')

  // 5. 构建
  console.log(pc.blue('\nBuilding package...'))
  run(buildCommand)

  // 6. 发布到 npm
  console.log(pc.blue(`\nPublishing version ${newVersion}...`))
  const publishTag = releaseType === 'prerelease' ? preid : 'latest'
  run(`npm publish --tag ${publishTag}`)

  // 7. 推送到 Git
  console.log(pc.blue('\nPushing to Git...'))
  run('git push')
  run('git push --tags')

  console.log(pc.green(`\n✅ Successfully published li-daisy@${newVersion}`))
}

main().catch(err => {
  exit(err.message || 'An unexpected error occurred.')
})
