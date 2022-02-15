import { resolve } from 'path'
import { writeFileWithTemplate } from './util'

type Environment = 'prod' | 'dev' | 'local'

async function configureEnvironment(environment: Environment) {
  const configDir = resolve(__dirname, '..', '..', 'feature', 'config', 'src')
  const configFile = resolve(configDir, `${environment}.json`)
  const targetFile = resolve(configDir, 'config.json')
  console.log({ configFile, targetFile })
  await writeFileWithTemplate(configFile, targetFile, {})
}

configureEnvironment(process.argv[2] as any)
