import DeviceInfo from 'react-native-device-info'

export async function isEmulator() {
  return DeviceInfo?.isEmulator() ?? false
}
