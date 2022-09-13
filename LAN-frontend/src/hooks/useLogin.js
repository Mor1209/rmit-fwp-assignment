import { verifyUser } from '../data/users'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import capitalize from '../helpers/capitalize'
import { useState } from 'react'
const speakeasy = require('speakeasy')

export const useLogin = () => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()
  const [loginDetails, setLoginDetails] = useState({})

  const login = token => {
    const user = verifyUser(loginDetails.email, loginDetails.password)

    if (!user) {
      sendNotification('error', 'Wrong credentials !')
      return
    }

    const verifiedToken = (user, token) => {
      return speakeasy.totp.verify({
        secret: user.secretkey,
        encoding: 'ascii',
        token,
      })
    }

    if (!verifiedToken) {
      sendNotification('error', 'Token is not valid !')
      return
    }

    dispatchAuth({
      type: 'LOGIN',
      user,
    })
    sendNotification(
      'success',
      `Welcome back ${capitalize(user.name)} !`,
      false
    )
    navigate('/profile')
  }

  const validate = (email, password) => {
    const user = verifyUser(email, password)

    if (!user) {
      sendNotification('error', 'Wrong credentials !')
      return
    }

    setLoginDetails({ email, password })
  }

  return { login, validate }
}
