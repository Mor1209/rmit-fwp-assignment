import { addUser, userExists } from '../data/users'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import { capitalize } from '@mui/material'
import { useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
import { setUser } from '../data/users'
// import * as qrcode from 'qrcode'
// const speakeasy = require('speakeasy')

// register functionality invoked from the register form
export const useRegister = registerDetails => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()

  // const [registerDetails, setRegisterDetails] = useState({})
  // const [qr, setQr] = useState('')
  // const [secret, setSecret] = useState({})

  const postRegister = async userData => {
    const { data } = await axios.post(
      'http://localhost:4000/rest-api/users/register',
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

  return useMutation(['user'], postRegister, {
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
        `Welcome ${capitalize(user.username)} !`,
        false
      )
      navigate('/profile')
    },
  })

  // useEffect(() => {
  //   const getQr = async () => {
  //     try {
  //       // generating secret with speakeasy
  //       const newSecret = speakeasy.generateSecret({ name: 'LoopAgileNow' })
  //       setSecret(newSecret)
  //       // translating mfa register link to qr code
  //       // to be used in authenticator app to get token for user
  //       const qrDataURL = await qrcode.toDataURL(newSecret.otpauth_url)
  //       setQr(qrDataURL)
  //     } catch (err) {
  //       console.error(err)
  //     }
  //   }

  //   getQr()
  // }, [])

  // const verified = speakeasy.totp.verify({
  //   secret: secret.ascii,
  //   encoding: 'ascii',
  //   token,
  // })

  // if (!verified) {
  //   sendNotification('error', 'Token is not valid !')
  //   return
  // }

  // const user = addUser(
  //   registerDetails.name,
  //   registerDetails.email,
  //   registerDetails.password,
  //   secret.ascii,
  //   token
  // )

  // return { register, qr, secret, setRegisterDetails }
}

// const validate = (name, email, password) => {
//   // const user = userExists(email)

//   // if (user) {
//   //   sendNotification('error', 'User with email already exists !')
//   //   return
//   // }

//   setRegisterDetails({
//     name,
//     email,
//     password,
//   })

//   return true
// }
