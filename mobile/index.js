import { App } from '@silo/screens'
import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import { LogBox } from 'react-native'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])

AppRegistry.registerComponent(appName, () => App)
