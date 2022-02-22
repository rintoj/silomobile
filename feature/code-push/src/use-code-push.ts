import config from '@silo-feature/config'
import { useOnDeviceResume } from '@silo-feature/device'
import React from 'react'
import { Platform } from 'react-native'
import codePush, { DownloadProgress } from 'react-native-code-push'

export function useCodePush(): [
  () => Promise<any>,
  { loading: boolean; progress: number; status: codePush.SyncStatus },
] {
  const [loading, setLoading] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [status, setStatus] = React.useState<codePush.SyncStatus>(codePush.SyncStatus.UP_TO_DATE)
  const installUpdate = React.useCallback(async () => {
    const onStatusChange = (syncStatus: codePush.SyncStatus) => {
      setStatus(syncStatus)
      if (
        [
          codePush.SyncStatus.UP_TO_DATE,
          codePush.SyncStatus.UNKNOWN_ERROR,
          codePush.SyncStatus.UPDATE_IGNORED,
        ].includes(syncStatus)
      ) {
        setLoading(false)
      } else {
        setLoading(true)
      }
    }

    const onDownloadProgress = (downloadProgress: DownloadProgress) => {
      setProgress(Math.floor(downloadProgress.receivedBytes / downloadProgress.totalBytes) * 100)
    }

    return codePush.sync(
      {
        installMode: codePush.InstallMode.IMMEDIATE,
        deploymentKey: config.codePush[Platform.OS],
      },
      onStatusChange,
      onDownloadProgress,
    )
  }, [])

  const checkForUpdate = React.useCallback(async () => {
    if (loading) {
      return
    }
    const updateAvailable = await codePush.checkForUpdate(config.codePush[Platform.OS])
    if (updateAvailable) {
      installUpdate()
    }
  }, [installUpdate, loading])

  useOnDeviceResume(checkForUpdate)

  return [installUpdate, { loading, progress, status }]
}
