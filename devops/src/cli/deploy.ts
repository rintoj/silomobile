import chalk from 'chalk'
import { gitDescribeSync } from 'git-describe'
import * as semver from 'semver'
import { config } from '../config'
import {
  getAndroidDir,
  getIOSDir,
  getReactNativeDir,
  getRootDir,
  GitHubApi,
  runCommand,
} from '../util'

enum Platform {
  IOS = 'ios',
  ANDROID = 'android',
}

enum Environment {
  DEV = 'dev',
  PROD = 'prod',
}

enum DeploymentType {
  PUSH = 'push',
  BINARY = 'binary',
}

enum ChangeType {
  MAJOR = 'major',
  MINOR = 'minor',
  PATCH = 'patch',
}

interface Context {
  platform: Platform
  changeType: ChangeType
  deployment: DeploymentType
  appIdentifier: string
  appVersion: string
  currentVersion: string
  previousVersion: string
  codePushVersion: string
  environment: Environment
  allowDirty: boolean
}

const git = new GitHubApi(config.github)

const paths = {
  ios: getIOSDir(),
  android: getAndroidDir(),
  rootDir: getRootDir(),
  reactNative: getReactNativeDir(),
}

const commands = {
  fastlane: {
    android: 'fastlane android deploy',
    ios: 'fastlane ios deploy',
  },
  git: {
    reset: 'git reset --hard',
    checkoutTag: (tag: string) => `git checkout tags/${tag}`,
  },
  yarn: {
    setEnv: (env: string) => `yarn set:${env}`,
  },
  codepush: {
    ios: {
      dev: 'appcenter codepush release-react -a Silo-Technologies/Silo-Mobile -d Staging',
      prod: 'appcenter codepush release-react -a Silo-Technologies/Silo-Mobile -d Production',
    },
    android: {
      dev: 'appcenter codepush release-react -a Silo-Technologies/Silo-Mobile-1 -d Staging',
      prod: 'appcenter codepush release-react -a Silo-Technologies/Silo-Mobile-1 -d Production',
    },
  },
  linkDirs: ['hermes-engine', 'react-native-code-push'],
}

async function getAppVersion(env: Environment, currentVersion: string) {
  const latestVersion = (currentVersion ?? 'v0.1.0').substring(1)
  if (env === Environment.PROD) {
    return latestVersion
  }
  const appVersion = semver.inc(latestVersion, 'minor')
  if (!appVersion) {
    throw Error('Invalid Application Version')
  }
  return appVersion
}

function getCodePushBundleVersion(version: string) {
  const parsedVersion = semver.parse(version)
  if (!parsedVersion) {
    throw Error('Invalid Application Version')
  }
  return `${parsedVersion.major}.${parsedVersion.minor}.x`
}

async function getChangeType(currentVersion: string, previousVersion: string) {
  if (!previousVersion) {
    return ChangeType.MINOR
  }
  const diff = semver.diff(
    (currentVersion ?? 'v1.0.0').substring(1),
    (previousVersion ?? 'v1.0.0').substring(1),
  )
  switch (diff) {
    case 'major':
      return ChangeType.MAJOR
    case 'minor':
      return ChangeType.MINOR
    case 'patch':
      return ChangeType.PATCH
    default:
      throw new Error('Invalid Version')
  }
}

async function getDeploymentType(versionType: ChangeType) {
  switch (versionType) {
    case ChangeType.MAJOR:
    case ChangeType.MINOR:
      return DeploymentType.BINARY
    case ChangeType.PATCH:
      return DeploymentType.PUSH
    default:
      throw new Error('Invalid Version')
  }
}

function getAppIdentifier(env: string) {
  return `com.usesilo.mobile.${env === Environment.PROD ? 'prod' : 'stage'}`
}

function printContext({
  platform,
  changeType,
  deployment,
  appVersion,
  codePushVersion,
  currentVersion,
  previousVersion,
  environment,
  allowDirty,
}: Context) {
  console.log(`
  ${chalk.green('Platform')}           : ${chalk.yellow(platform)}
  ${chalk.green('Change')}             : ${chalk.yellow(changeType)}
  ${chalk.green('Deployment')}         : ${chalk.yellow(deployment)}
  ${chalk.green('Binary version')}     : ${chalk.yellow(appVersion)}
  ${chalk.green('Codepush version')}   : ${chalk.yellow(codePushVersion)}
  ${chalk.green('Environment')}        : ${chalk.yellow(environment)}
  ${chalk.green('Allow Dirty Branch')} : ${chalk.yellow(allowDirty)}
  ${chalk.green('Current version')}    : ${chalk.yellow(currentVersion)}
  ${chalk.green('Previous version')}   : ${chalk.yellow(previousVersion)}
  `)
}

type Flags = {
  ['platform']: Platform
  ['environment']: Environment
  ['deployment']: DeploymentType
  ['allow-dirty']: boolean
  ['dry-run']: boolean
}

function showUsage() {
  console.log(`
  ${chalk.green('deploy')}
    ${chalk.yellow('--platform=ios/android')}
    ${chalk.yellow('--environment=dev/ios')}
    ${chalk.grey('--deployment=push/binary')}
    ${chalk.grey('--allow-dirty')}
    ${chalk.grey('--dry-run')}
  `)
}

async function createContext({
  platform,
  deployment,
  environment,
  allowDirty,
}: {
  platform: Platform
  environment: Environment
  deployment: DeploymentType
  allowDirty: boolean
}): Promise<Context> {
  if (!platform) {
    throw new Error('Missing required input "platform"')
  }
  if (![Platform.IOS, Platform.ANDROID].includes(platform)) {
    throw new Error(`Invalid platform "${platform}". Usage: --platform=ios/android`)
  }
  if (!environment) {
    throw new Error('Missing required input "environment"')
  }
  if (![Environment.DEV, Environment.PROD].includes(environment)) {
    throw new Error(`Invalid environment "${environment}". Usage: --environment=dev/prod`)
  }
  if (deployment && ![DeploymentType.BINARY, DeploymentType.PUSH].includes(deployment)) {
    throw new Error(`Invalid deployment type "${deployment}". Usage: --deployment=push/binary`)
  }
  const tags = (await git.fetchReleases()).map(release => release.tag_name)
  if (!tags?.length) {
    throw new Error('No releases found')
  }

  const [currentVersion, previousVersion] = tags
  const changeType = await getChangeType(currentVersion, previousVersion)
  const appVersion = await getAppVersion(environment, currentVersion)

  return {
    platform,
    changeType,
    appVersion,
    environment,
    allowDirty,
    currentVersion,
    previousVersion,
    codePushVersion: getCodePushBundleVersion(appVersion),
    appIdentifier: getAppIdentifier(environment),
    deployment: deployment ?? (await getDeploymentType(changeType)),
  }
}

export default async function deployApp({
  platform,
  deployment,
  environment = Environment.DEV,
  'allow-dirty': allowDirty = false,
  'dry-run': dryRun = false,
}: Flags) {
  try {
    const context = await createContext({ platform, deployment, environment, allowDirty })

    printContext(context)

    // check if current branch is dirty
    const { dirty } = gitDescribeSync()
    if (!allowDirty && dirty) {
      throw new Error(
        chalk`{red Error: You have uncommitted changes in this branch. Please commit changes before deployment}`,
      )
    }

    // set environment
    await runCommand(commands.yarn.setEnv(environment), paths.rootDir)

    // exit if dry run
    if (dryRun) {
      return console.warn(chalk.yellow('This was a dry run!'))
    }

    // checkout a version if prod
    if (!allowDirty && context.environment === Environment.PROD) {
      await runCommand(commands.git.checkoutTag(context.currentVersion))
    }

    await Promise.all(
      commands.linkDirs.map(async dir => {
        await runCommand(
          `ln -sfv ${paths.rootDir}/node_modules/${dir} ${paths.reactNative}/node_modules/${dir}`,
        )
      }),
    )

    // do code push
    if (context.deployment === DeploymentType.PUSH) {
      const command = `${commands.codepush[platform][environment]} --target-binary-version ${context.codePushVersion}`
      await runCommand(command, paths.reactNative)
    }

    // release binary
    if (context.deployment === DeploymentType.BINARY) {
      const isProd = context.environment === Environment.PROD
      const command = `${commands.fastlane[platform]} version:${context.appVersion} identifier:${context.appIdentifier} isProd:${isProd}`
      await runCommand(command, paths[platform])
    }

    // reset current working directory
    if (!allowDirty) {
      await runCommand(commands.git.reset)
    }
  } catch (e: any) {
    console.error(chalk.red(`\n${e.toString()}`))
    showUsage()
    process.exit(0)
  }
}
