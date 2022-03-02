import { resolve } from 'path'
export function getIOSDir() {
  return resolve(__dirname, '../../../mobile/ios')
}
export function getAndroidDir() {
  return resolve(__dirname, '../../../mobile/android')
}
export function getFrontendRootDir() {
  return resolve(__dirname, '../../../')
}

export function getMobileDir() {
  return resolve(__dirname, '../../../mobile')
}
