import { setUser } from '../data/users'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import capitalizeAll from '../helpers/capitalize'
import { capitalize } from '@mui/material'
import { useState } from 'react'
import { useMutation, useQuery } from 'react-query'
import axios from 'axios'
// const speakeasy = require('speakeasy')

// login functionality invoked from the login form
export const useLogin = (email, password) => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()
  // const [loginDetails, setLoginDetails] = useState({})

  const postLogin = async userData => {
    const { data } = await axios.post(
      'http://localhost:4000/rest-api/users/login',
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

  return useMutation(['user'], postLogin, {
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

  // const login = token => {
  //   const user = verifyUser(loginDetails.email, loginDetails.password)

  //   if (!user) {
  //     sendNotification('error', 'Wrong credentials !')
  //     return
  //   }

  //   // use speakeasy to verify token
  //   const verifiedToken = (user, token) => {
  //     return speakeasy.totp.verify({
  //       secret: user.secretkey,
  //       encoding: 'ascii',
  //       token,
  //     })
  //   }

  //   if (!verifiedToken) {
  //     sendNotification('error', 'Token is not valid !')
  //     return
  //   }

  //   dispatchAuth({
  //     type: 'LOGIN',
  //     user,
  //   })
  //   sendNotification(
  //     'success',
  //     `Welcome back ${capitalize(user.name)} !`,
  //     false
  //   )
  //   navigate('/profile')
  // }

  // const validate = (email, password) => {
  //   const user = verifyUser(email, password)

  //   if (!user) {
  //     sendNotification('error', 'Wrong credentials !')
  //     return
  //   }

  //   setLoginDetails({ email, password })
  // }

  // return { login, validate }
}
