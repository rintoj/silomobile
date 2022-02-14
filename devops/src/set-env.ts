import { copy } from 'fs-extra'
import { resolve } from 'path'
import replace from 'replace'
import { exec } from 'shelljs'
import { writeFileWithTemplate } from './util'

type Environment = 'prod' | 'dev' | 'local'

function getLocalIP(environment: Environment) {
  if (environment !== 'local') {
    return
  }
  return exec("ifconfig | grep broadcast | head -1 | awk '{print $2}'").split('\n')[0]
}

async function copyFileOrDirectory(fileName: string, targetDir: string, environment: string) {
  const configDir = resolve(__dirname, '../env', environment)
  await copy(`${configDir}/${fileName}`, `${targetDir}/${fileName}`)
}

const appDir = resolve(__dirname, '../../mobile')
const iosDir = resolve(appDir, 'ios')

export async function configureEnvironment(environment: 'local' | 'dev' | 'prod') {
  const localIP = getLocalIP(environment)
  const configDir = resolve(__dirname, '..', '..', 'features', 'config', 'src')
  const configFile = resolve(configDir, `${environment}.json`)
  const targetFile = resolve(configDir, 'config.json')
  await writeFileWithTemplate(configFile, targetFile, { localIP })
  await copyFileOrDirectory('GoogleService-Info.plist', iosDir, environment)
  await copyFileOrDirectory('Images.xcassets', resolve(iosDir, 'GM'), environment)
  await copyFileOrDirectory('AppCenter-Config.plist', iosDir, environment)
  await copyFileOrDirectory('splash-icon.png', resolve(iosDir, 'GM'), environment)
  await updateIOSBundleId(environment)
}

async function updateIOSBundleId(environment: Environment) {
  const currentEnv = environment === 'prod' ? 'prod' : 'dev'
  const alternateEnv = environment === 'prod' ? 'dev' : 'prod'
  const files = [
    resolve(iosDir, 'GM.xcodeproj', 'project.pbxproj'),
    resolve(iosDir, 'GM', 'Info.plist'),
    resolve(iosDir, 'fastlane', 'Appfile'),
  ]
  replace({
    regex: new RegExp(`xyz.saygm.${alternateEnv}`, 'g'),
    replacement: `xyz.saygm.${currentEnv}`,
    paths: files,
  })
}
