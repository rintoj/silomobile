import React from 'react'
import codePush from 'react-native-code-push'

export function withCodePush(children: React.ReactElement) {
  return () =>
    codePush({
      checkFrequency: codePush.CheckFrequency.MANUAL,
    })(children)
}
