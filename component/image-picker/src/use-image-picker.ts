import { useActionSheet } from '@expo/react-native-action-sheet'
import React from 'react'
import { Alert, Linking } from 'react-native'
import {
  ImagePickerResponse as RNImagePickerResponse,
  launchCamera,
  launchImageLibrary,
  PhotoQuality,
} from 'react-native-image-picker'
import { ImagePickerResponse, ImageSource } from './types'

const mediaOptions = {
  mediaType: 'photo' as const,
  maxWidth: 4032,
  maxHeight: 4032,
  quality: 0.8 as PhotoQuality,
  saveToPhotos: false,
}

export function useImagePicker(): [
  (source?: ImageSource) => void,
  { loading: boolean; data?: ImagePickerResponse; error?: Error },
] {
  const [response, setResponse] = React.useState<ImagePickerResponse>()
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState<Error>()
  const onCameraPermissionDenied = React.useCallback(() => {
    Alert.alert('Enable camera access', 'Turn on camera access to shoot and share photo 📸.', [
      { text: 'Cancel' },
      { text: 'Settings', onPress: () => Linking.openURL('app-settings://') },
    ])
  }, [])

  const onSelectImage = React.useCallback(
    ({ assets = [], errorCode, errorMessage }: RNImagePickerResponse) => {
      const [asset] = assets

      if (asset) {
        if (asset.uri && asset.width && asset.height) {
          setResponse({ uri: asset.uri, width: asset.width, height: asset.height })
        } else setError(new Error(`Couldn't get the selected image.`))
      }
      if (errorCode || errorMessage) {
        errorCode ? onCameraPermissionDenied() : setError(new Error(errorMessage))
      }
      setLoading(false)
    },
    [onCameraPermissionDenied],
  )

  const openCamera = React.useCallback(
    () => launchCamera(mediaOptions, onSelectImage),
    [onSelectImage],
  )
  const openGallery = React.useCallback(
    () => launchImageLibrary(mediaOptions, onSelectImage),
    [onSelectImage],
  )
  const open = React.useCallback(
    (source?: ImageSource) => {
      setLoading(true)
      source == ImageSource.CAMERA ? openCamera() : openGallery()
    },
    [openCamera, openGallery],
  )

  return [open, { loading, data: response, error }]
}

export function useImagePickerActionSheet(
  title: string,
): [() => void, { loading: boolean; data?: ImagePickerResponse; error?: Error }] {
  const [pick, data] = useImagePicker()
  const { showActionSheetWithOptions } = useActionSheet()

  const open = React.useCallback(() => {
    showActionSheetWithOptions(
      {
        title,
        options: ['Camera', 'Photo Library', 'Cancel'],
        cancelButtonIndex: 2,
      },
      (optionIndex?: number) => {
        switch (optionIndex) {
          case 0:
            return pick(ImageSource.CAMERA)
          case 1:
            return pick(ImageSource.GALLERY)
        }
      },
    )
  }, [pick, showActionSheetWithOptions, title])

  return [open, data]
}
