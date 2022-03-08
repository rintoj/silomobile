import chalk from 'chalk'
import minimist from 'minimist'

function showUsage() {
  console.log(`
  ${chalk.yellow('yarn cli')} ${chalk.green('<command>')} ${chalk.gray('[args]')}

  commands:

  ${chalk.green('create')} ${chalk.yellow('component')} ${chalk.grey('<name>')}
  ${chalk.green('create')} ${chalk.yellow('feature')} ${chalk.grey('<name>')}
  ${chalk.green('release')} ${chalk.yellow('minor/patch')} ${chalk.grey('--dry-run')}
  ${chalk.green('deploy')} ${chalk.yellow('--platform=ios/android')} ${chalk.yellow(
    '--environment=dev/prod',
  )} ${chalk.grey('--allow-dirty')}
  ${chalk.green('current-release')}

  `)
}

async function run() {
  const argv = minimist(process.argv.slice(2))

  const [command, ...args] = argv._

  try {
    if (!command) {
      return showUsage()
    }
    await require(`./${command}`).default(argv, ...args)
  } catch (e: any) {
    if (/Cannot find module/.test(e.message)) {
      console.error(chalk.red(`Invalid command: ${command}`))
      return showUsage()
    }
    console.error(chalk.red(`Failed to run command: ${command}`, e))
  }
}

run()
