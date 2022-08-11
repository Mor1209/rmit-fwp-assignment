import { Alert, Fade, Snackbar } from '@mui/material'
import React from 'react'
import { useNotificationContext } from '../../hooks/useNotificationContext'

const Notification = () => {
  const { notification, resetNotification } = useNotificationContext()

  const alertProps = {}

  if (!!notification.severity) {
    alertProps.severity = notification.severity
  }

  if (!notification.icon) {
    alertProps.icon = false
  }

  return (
    <Snackbar
      open={!!notification.message}
      autoHideDuration={6000}
      onClose={resetNotification}
      sx={{ mt: 4 }}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      TransitionComponent={Fade}
    >
      <Alert elevation={5} sx={{ width: '100%' }} {...alertProps}>
        {notification.message}
      </Alert>
    </Snackbar>
  )
}

export default React.memo(Notification)
