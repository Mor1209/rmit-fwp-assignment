import { addUser, userExists } from '../data/users'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import capitalize from '../helpers/capitalize'
import { useEffect, useState } from 'react'
import * as qrcode from 'qrcode'
const speakeasy = require('speakeasy')

export const useRegister = () => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()

  const [registerDetails, setRegisterDetails] = useState({})
  const [qr, setQr] = useState('')
  const [secret, setSecret] = useState({})

  useEffect(() => {
    console.log('useEffect')
    const getQr = async () => {
      try {
        const newSecret = speakeasy.generateSecret({ name: 'LoopAgileNow' })
        setSecret(newSecret)
        const qrDataURL = await qrcode.toDataURL(newSecret.otpauth_url)
        console.log(qrDataURL)
        setQr(qrDataURL)
      } catch (err) {
        console.error(err)
      }
    }

    getQr()
  }, [])

  const register = token => {
    const verified = speakeasy.totp.verify({
      secret: secret.ascii,
      encoding: 'ascii',
      token,
    })

    if (!verified) {
      sendNotification('error', 'Token is not valid !')
      return
    }

    const user = addUser(
      registerDetails.name,
      registerDetails.email,
      registerDetails.password,
      secret.ascii,
      token
    )

    if (!user) {
      sendNotification('error', 'User with email already exists !')
      return
    }

    dispatchAuth({
      type: 'REGISTER',
      user,
    })
    sendNotification('success', `Welcome ${capitalize(user.name)} !`, false)
    navigate('/profile')
  }

  const validate = (name, email, password) => {
    const user = userExists(email)

    if (user) {
      sendNotification('error', 'User with email already exists !')
      return
    }

    setRegisterDetails({
      name,
      email,
      password,
    })

    return true
  }

  return { register, validate, qr, secret, setRegisterDetails }
}
