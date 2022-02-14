import { Platform } from 'react-native'

const DeviceInfo = Platform.OS === 'web' ? null : require('react-native-device-info')

export function getDeviceId() {
  if (DeviceInfo) {
    return DeviceInfo.getUniqueId()
  }
  return null
}
