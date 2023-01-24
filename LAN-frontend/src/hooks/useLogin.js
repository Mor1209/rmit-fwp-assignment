import { setUser } from '../data/users'
import { useNotificationContext } from '../hooks/useNotificationContext'
import { useAuthContext } from './useAuthContext'
import { useNavigate } from 'react-router-dom'
import capitalizeAll from '../helpers/capitalize'
import { capitalize } from '@mui/material'
import { useMutation } from 'react-query'
import { useState } from 'react'
import axios from 'axios'

// login functionality invoked from the login form
export const useLogin = ({ setStep }) => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth } = useAuthContext()
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({})

  const postValidateUser = async userData => {
    setUserDetails(userData)
    const { data } = await axios.post(
      `${process.env.REACT_APP_REST_API_URL}/users/validate-user`,
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

  const postLogin = async userData => {
    const updatedData = { ...userDetails, ...userData }
    setUserDetails(updatedData)
    const { data } = await axios.post(
      `${process.env.REACT_APP_REST_API_URL}/users/login`,
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

  const validateUserMutation = useMutation(['user'], postValidateUser, {
    onError: error => {
      sendNotification('error', capitalize(error.response.data.message))
    },
    onSuccess: () => {
      setStep(2)
    },
  })

  const loginMutation = useMutation(['user'], postLogin, {
    onError: error => {
      sendNotification('error', capitalize(error.response.data.message))
    },
    onSuccess: res => {
      const user = res.data.user

      setUser(user)
      dispatchAuth({
        type: 'LOGIN',
        user,
      })
      sendNotification(
        'success',
        `Welcome back ${capitalizeAll(user.username)} !`,
        false
      )
      navigate('/profile')
    },
  })

  return { loginMutation, validateUserMutation }
}
