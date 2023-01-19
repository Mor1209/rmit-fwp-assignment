import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { capitalize } from '@mui/material'
import capitalizeAll from '../helpers/capitalize'
import { useState } from 'react'
import { useMutation } from 'react-query'
import axios from 'axios'
import { setUser } from '../data/users'

// register functionality invoked from the register form
export const useRegister = ({ setStep }) => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()

  const [qrCode, setQrCode] = useState('')
  const [mfaSecret, setMfaSecret] = useState({})
  const [userDetails, setUserDetails] = useState({})

  const postRegisterMfa = async userData => {
    setUserDetails(userData)
    const { data } = await axios.post(
      'http://localhost:4000/rest-api/users/register-mfa',
      userData,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    )
    return data
  }

  const postRegister = async userData => {
    const updatedData = { ...userDetails, ...userData, mfaSecret }
    setUserDetails(updatedData)
    const { data } = await axios.post(
      'http://localhost:4000/rest-api/users/register',
      updatedData,
      {
        withCredentials: true,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
          'Content-Type': 'application/json;charset=UTF-8',
        },
      }
    )
    return data
  }

  const registerMfaMutation = useMutation(['user'], postRegisterMfa, {
    onError: error => {
      sendNotification('error', capitalize(error.response.data.message))
    },
    onSuccess: res => {
      setStep(2)
      setMfaSecret(res.data.mfaSecret)
      setQrCode(res.data.qrCode)
    },
  })

  const registerMutation = useMutation(['user'], postRegister, {
    onError: error => {
      sendNotification('error', capitalize(error.response.data.message))
    },
    onSuccess: res => {
      const user = res.data.user

      setUser(user)
      dispatchAuth({
        type: 'REGISTER',
        user,
      })
      sendNotification(
        'success',
        `Welcome ${capitalizeAll(user.username)} !`,
        false
      )
      navigate('/profile')
    },
  })

  return {
    qrCode,
    mfaSecret,
    registerMutation,
    registerMfaMutation,
  }
}
