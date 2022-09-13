import { useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

export const useNotificationContext = () => {
  const notificationContext = useContext(NotificationContext)

  if (!notificationContext) {
    throw Error(
      'useNotificationContext is not inside an NotificationContext Provider!'
    )
  }

  return notificationContext
}
