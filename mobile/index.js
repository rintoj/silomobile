import { withCodePush } from '@silo-feature/code-push'
import { App } from '@silo/screens'
import { AppRegistry, LogBox } from 'react-native'
import { name as appName } from './app.json'

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you're using an old API with gesture components, check out new Gestures system!",
])

AppRegistry.registerComponent(appName, withCodePush(App))
