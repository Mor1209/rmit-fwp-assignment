import { Stack, Typography } from '@mui/material'
import React from 'react'
import { useAuthContext } from '../../hooks/useAuthContext'
import capitalize from '../../helpers/capitalize'

const UserProfileDetails = () => {
  const authCtx = useAuthContext()

  const name = capitalize(authCtx.user.name)

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
        {authCtx.user.email}
      </Typography>

      <Typography textAlign="left" variant="body1" color="dimgray">
        Joined:{' '}
        {new Intl.DateTimeFormat('EN-AU').format(
          new Date(authCtx.user.created)
        )}
      </Typography>
    </Stack>
  )
}

export default UserProfileDetails
