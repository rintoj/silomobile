import minimist from 'minimist'
import chalk from 'chalk'

function showUsage() {
  console.log(`
  ${chalk.yellow('yarn cli')} ${chalk.green('<command>')} ${chalk.gray('[args]')}

  commands:

  ${chalk.green('create')} ${chalk.yellow('component')} ${chalk.grey('<name>')}
  ${chalk.green('create')} ${chalk.yellow('feature')} ${chalk.grey('<name>')}

  `)
}

function run() {
  const argv = minimist(process.argv.slice(2))

  const [command, ...args] = argv._

  try {
    if (!command) {
      return showUsage()
    }
    require(`./${command}`).default(...args)
  } catch (e: any) {
    if (/Cannot find module/.test(e.message)) {
      console.error(chalk.red(`Invalid command: ${command}`))
      return showUsage()
    }
    console.error(chalk.red(`Failed to run command: ${command}`, e))
  }
}

run()
