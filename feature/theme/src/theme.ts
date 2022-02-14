import { COLOR, THEME } from 'native-x-theme'

export enum COLOR_X {
  ACCENT_LIGHT = 'ACCENT_LIGHT',
  SUCCESS_LIGHT = 'SUCCESS_LIGHT',
  ERROR_LIGHT = 'ERROR_LIGHT',
  WARNING_LIGHT = 'WARNING_LIGHT',
  TERTIARY_DARK = 'TERTIARY_DARK',
}

export const THEMES = {
  [THEME.LIGHT]: {
    [COLOR.PRIMARY]: '#FFFFFF',
    [COLOR.SECONDARY]: '#202D42',
    [COLOR.TERTIARY]: '#86929E',
    [COLOR.ACCENT]: '#00A3FF',
    [COLOR_X.ACCENT_LIGHT]: '#DEEAF8',
    [COLOR.DIVIDER]: '#F7F7F7',
    [COLOR.DISABLED]: '#EEEEEE',
    [COLOR.INPUT]: '#EEEEEE',
    [COLOR.SUCCESS]: '#34C759',
    [COLOR_X.SUCCESS_LIGHT]: '#EBF9EE',
    [COLOR.ERROR]: '#FF3B30',
    [COLOR_X.ERROR_LIGHT]: '#FFEBEA',
    [COLOR.WARNING]: '#FFA100',
    [COLOR_X.WARNING_LIGHT]: '#FFF4E6',
    [COLOR.TRANSPARENT]: 'transparent',
  },
}
