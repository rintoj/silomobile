import { resolve } from 'path'

export function getRootDir() {
  return resolve(__dirname, '..', '..', '..')
}

export function getSourceTemplateDir() {
  return resolve(__dirname, '..', '..', 'templates')
}
