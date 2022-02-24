import AsyncStorage from '@react-native-community/async-storage'
const AUTH_TOKEN_KEY = 'AUTH_TOKEN'

export async function getAuthToken() {
  return AsyncStorage.getItem(AUTH_TOKEN_KEY)
}

export async function setAuthToken(token: string) {
  return AsyncStorage.setItem(AUTH_TOKEN_KEY, token)
}

export async function clearAuthToken() {
  return AsyncStorage.removeItem(AUTH_TOKEN_KEY)
}
