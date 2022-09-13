import React, { createContext, useState } from 'react'

// set notification context to display a new notification
export const NotificationContext = createContext({
  notification: {
    severity: '',
    message: '',
    icon: true,
  },
  sendNotification: (severity, message, icon = true) => {},
  resetNotification: () => {},
})

export const NotificationContextProvider = ({ children }) => {
  const [notification, setNotification] = useState({
    severity: '',
    message: '',
    icon: true,
  })

  const sendNotification = (severity, message, icon = true) => {
    setNotification({ severity, message, icon })
  }

  const resetNotification = () => {
    setNotification({ ...notification, message: '' })
  }

  return (
    <NotificationContext.Provider
      value={{ notification, sendNotification, resetNotification }}
    >
      {children}
    </NotificationContext.Provider>
  )
}
