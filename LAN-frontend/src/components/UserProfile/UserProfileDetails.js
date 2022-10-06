import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import capitalize from '../../helpers/capitalize'
import axios from 'axios'
import { useQuery } from 'react-query'
import { updateUser } from '../../data/users'

const UserProfileDetails = () => {
  let { user, dispatchAuth } = useAuthContext()
  const getCurrentUser = async () => {
    const { data } = await axios.get(
      'http://localhost:4000/rest-api/users/current',
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

  // dont refetch for at least 2min
  const res = useQuery('user', getCurrentUser, { staleTime: 120000 })

  // update user if not up to date anymore,
  // this could hapen if userdetails are change from a diffrent device for example
  if (
    res.isSuccess &&
    (user.username !== res.data.data.user.username ||
      user.email !== res.data.data.user.email)
  ) {
    user = res.data.data.user
    // updating authContext by dispatching login
    dispatchAuth({
      type: 'LOGIN',
      user,
    })
    updateUser(res.data.data.user)
  }

  const name = capitalize(user.username)

  return (
    <Stack>
      <Typography
        textAlign="left"
        variant="h5"
        fontWeight="Medium"
        sx={{ pb: 1 }}
      >
        {name}
      </Typography>
      <Typography textAlign="left" variant="body1" color="dimgray">
        {user.email}
      </Typography>

      <Typography textAlign="left" variant="body1" color="dimgray">
        Joined:{' '}
        {new Intl.DateTimeFormat('EN-AU').format(new Date(user.createdAt))}
      </Typography>
    </Stack>
  )
}

export default UserProfileDetails
