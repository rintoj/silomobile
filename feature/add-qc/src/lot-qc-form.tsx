import { useActionSheet } from '@expo/react-native-action-sheet'
import { Button } from '@silo-component/button'
import { ImageSource, useImagePicker } from '@silo-component/image-picker'
import { Text } from '@silo-component/text'
import { TextInput } from '@silo-component/text-input'
import { CameraIcon } from 'native-x-icon'
import { Image } from 'native-x-image'
import { Spacer } from 'native-x-spacer'
import { Stack } from 'native-x-stack'
import { Tappable } from 'native-x-tappable'
import { COLOR } from 'native-x-theme'
import React from 'react'

const styles = {
  imageButton: {
    borderStyle: 'dashed' as const,
    borderColor: '#CCC',
    borderWidth: 1,
    borderRadius: 16,
    overflow: 'hidden' as const,
  },
}

interface Props {
  onSubmit?: () => void
}

export function LotQCForm({ onSubmit }: Props) {
  const [chooseImage, { data }] = useImagePicker()
  const { showActionSheetWithOptions } = useActionSheet()
  const onAddImage = () => {
    showActionSheetWithOptions(
      {
        options: ['Open Camera', 'Pick from Library', 'Cancel'],
        cancelButtonIndex: 2,
      },
      index => {
        if (index === 0) {
          chooseImage(ImageSource.CAMERA)
        }
        if (index === 1) {
          chooseImage(ImageSource.GALLERY)
        }
      },
    )
  }

  return (
    <Stack fill padding='normal'>
      <TextInput
        label='Lot temp'
        placeholder='Lot temp'
        placeholderColor={COLOR.TERTIARY}
        textColor={COLOR.SECONDARY}
      />
      <Spacer size='small' />
      <TextInput label='BRICS score' placeholder='BRICS score' placeholderColor={COLOR.TERTIARY} />
      <Spacer />
      <Tappable onTap={onAddImage} style={styles.imageButton}>
        <Stack
          fillHorizontal
          backgroundColor={COLOR.DIVIDER}
          padding={['normal']}
          alignMiddle
          alignCenter
          horizontal
        >
          <CameraIcon color={COLOR.TERTIARY} />
          <Spacer size='small' />
          <Text textColor={COLOR.TERTIARY} alignCenter>
            Take or select photo
          </Text>
        </Stack>
      </Tappable>
      <Spacer />
      {data?.uri ? (
        <Stack width={160} borderRadius='large' fillHorizontal>
          <Image width={160} height={85} source={{ uri: data?.uri }} />
        </Stack>
      ) : null}
      <Spacer fill />
      <Button rounded={false} height={48} onTap={onSubmit}>
        Save & Submit
      </Button>
      <Spacer />
    </Stack>
  )
}
