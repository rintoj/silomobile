import { resolve } from 'path'

export function getRootDir() {
  return resolve(__dirname, '..', '..', '..')
}

export function getSourceTemplateDir() {
  return resolve(__dirname, '..', '..', 'templates')
}

export function getReactNativeDir() {
  return resolve(__dirname, getRootDir(), 'mobile')
}

export function getIOSDir() {
  return resolve(__dirname, getReactNativeDir(), 'ios')
}

export function getAndroidDir() {
  return resolve(__dirname, getReactNativeDir(), 'android')
}
