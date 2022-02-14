import { App } from '@silo/screens'
import React from 'react'
import 'react-native'
// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('renders correctly', () => {
  renderer.create(<App />)
})
