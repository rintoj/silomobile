import chalk from 'chalk'
import { gitDescribeSync } from 'git-describe'
import * as semver from 'semver'
import { getAndroidDir, getFrontendRootDir, getIOSDir, GitHubApi, runCommand } from '../util'

export enum AppVariant {
  ANDROID = 'android',
  IOS = 'ios',
}

export enum Environment {
  PROD = 'prod',
  DEV = 'dev',
}

// TODO: Specify Github config
const config = {
  github: {
    owner: '',
    apiURL: 'https://api.github.com',
    token: process.env.GITHUB_TOKEN as string,
    repo: '',
  },
}
const git = new GitHubApi({ ...config.github, repo: config.github.repo })

const commands = {
  android: {
    deploy: 'fastlane android deploy',
  },
  ios: {
    deploy: 'fastlane ios beta',
  },
  git: {
    reset: 'git reset --hard',
    checkoutTag: (tag: string) => `git checkout tags/${tag}`,
  },
  yarn: {
    setEnv: (env: string) => `yarn set:${env}`,
  },
}

export async function getAppVersion(env: Environment) {
  const [latestRelease] = await git.fetchReleases()
  const latestVersion = (latestRelease?.tag_name ?? 'v0.0.0').substring(1)
  if (env === Environment.PROD) {
    return latestVersion
  }
  const appVersion = semver.inc(latestVersion, 'patch')
  if (!appVersion) {
    throw Error('Invalid Application Version')
  }
  return appVersion
}

export async function releaseApp(variant: AppVariant, env: Environment) {
  const { dirty } = gitDescribeSync()
  if (dirty) {
    console.error(
      chalk`{red Error: Uncommitted changes are present. Please commit changes before deployment }`,
    )
    return
  }

  process.chdir(getFrontendRootDir())
  await runCommand(commands.yarn.setEnv(env))

  // TODO getAppVersion after setting up versioning
  // const appVersion = await getAppVersion(env)
  const appVersion = 'v0.1.0'
  const androidDir = getAndroidDir()
  const iosDir = getIOSDir()
  if (variant === AppVariant.ANDROID) {
    process.chdir(androidDir)

    await runCommand(
      `${commands.android.deploy} version:${appVersion}  isProdVersion:${env === Environment.PROD}`,
    )
  }
  if (variant === AppVariant.IOS) {
    process.chdir(iosDir)
    await runCommand(
      `${commands.ios.deploy} version:${appVersion} isProdVersion:${env === Environment.PROD}`,
    )
  }
  await runCommand(commands.git.reset)
}

const usage = 'Usage: yarn cli release <ios|android> <stag|dev>'
export default function release(variant: AppVariant, env: Environment) {
  if (!variant) {
    throw new Error(`"variant" is missing! \n${usage}\n`)
  }
  if (!env) {
    throw new Error(`"env" is missing! \n${usage}\n`)
  }

  return releaseApp(variant, env)
}
