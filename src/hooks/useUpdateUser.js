import React from 'react'
import { useAuthContext } from './useAuthContext'
import { useNotificationContext } from './useNotificationContext'
import { updateUser } from '../data/users'

export const useUpdateUser = () => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()

  const updateUserDetails = (name, email, password) => {
    const user = updateUser(name, email, password)

    if (!user) {
      sendNotification('error', 'User with email already exists !')
      return
    }

    dispatchAuth({
      type: 'LOGIN',
      user,
    })
    sendNotification('success', `User details updated succesfully !`, false)

    return user
  }

  return { updateUserDetails }
}
