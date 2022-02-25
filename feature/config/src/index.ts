import * as configJson from './config.json'
export type Environment = 'prod' | 'dev' | 'local'

export interface FrontendConfig {
  env: Environment
  app: App
  codePush: CodePush
  api: API
}

export interface App {
  urlScheme: string
}

export interface API {
  baseUrl: string
  version: string
}

export interface CodePush {
  ios: string
  android: string
  windows: string
  macos: string
  web: string
}

export default configJson as FrontendConfig
