export type ImagePickerResponse = {
  uri: string
  file?: File
  width: number
  height: number
}

export enum ImageSource {
  CAMERA = 'CAMERA',
  GALLERY = 'GALLERY',
}
