import { useAuthContext } from './useAuthContext'
import { useNotificationContext } from './useNotificationContext'
import { updateUser } from '../data/users'
import { useMutation } from 'react-query'
import axios from 'axios'
import { capitalize } from '@mui/material'

export const useUpdateUser = ({ handleToggle }) => {
  const { sendNotification } = useNotificationContext()
  const { dispatchAuth, logout } = useAuthContext()

  const patchUserUpdate = async userData => {
    const { data } = await axios.patch(
      `${process.env.REACT_APP_REST_API_URL}/users/current`,
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

  const deleteUser = async () => {
    const { data } = await axios.delete(
      `${process.env.REACT_APP_REST_API_URL}/users/current`,
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

  const updateMutation = useMutation(['user'], patchUserUpdate, {
    onError: error => {
      sendNotification('error', capitalize(error.response.data.message))
    },
    onSuccess: res => {
      const user = res.data.user

      updateUser(user)
      // updating authContext by dispatching login
      dispatchAuth({
        type: 'LOGIN',
        user,
      })
      handleToggle()
      sendNotification('success', `User details updated succesfully !`, false)
    },
  })

  const deleteMutation = useMutation(['user'], deleteUser, {
    onError: error => {
      sendNotification('error', capitalize(error.response.data.message))
    },
    onSuccess: () => {
      logout()
      handleToggle()
      sendNotification(
        'success',
        `Your user profile, all posts and comments have been deleted !`,
        false
      )
    },
  })

  return { updateMutation, deleteMutation }
}
