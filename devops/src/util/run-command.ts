import chalk from 'chalk'
import { exec } from 'shelljs'
export function runCommand(command: string, cwd?: string, fatal = true) {
  return new Promise((resolve, reject) => {
    console.log(chalk.gray(command))
    const child = exec(command, { silent: true, fatal, cwd }, async (code, stdout, stderr) => {
      if (code !== 0) {
        reject(stderr || stdout)
      } else {
        resolve(stderr || stdout)
      }
    })

    child.stdout?.pipe(process.stdout)
    child.stderr?.pipe(process.stderr)
  })
}
