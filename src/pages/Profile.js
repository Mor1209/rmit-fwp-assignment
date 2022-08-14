import React from 'react'
import { Container } from '@mui/system'
import {
  Typography,
  Paper,
  CssBaseline,
  Stack,
  IconButton,
} from '@mui/material'
import { useAuthContext } from '../hooks/useAuthContext'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'
import UserAvatar from '../components/UI/UserAvatar'

const Profile = () => {
  const authCtx = useAuthContext()

  const capitalize = str =>
    str
      .split(' ')
      .map(subStr => subStr.charAt(0).toUpperCase() + subStr.slice(1))
      .join(' ')

  const name = capitalize(authCtx.user.name)

  return (
    <Container component="main" maxWidth="sm">
      <CssBaseline />
      <Paper elevation={5} sx={{ mt: 5, overflow: 'hidden' }}>
        <Paper
          elevation={0}
          sx={{
            background:
              'linear-gradient(140deg, rgba(90,9,121,1) 0%, rgba(222,16,214,1) 0%, rgba(0,142,255,1) 100%)',
            width: '100%',
            borderBottomLeftRadius: 0,
            borderBottomRightRadius: 0,
            mb: 8,
          }}
        >
          <Stack
            direction="row"
            alignItems="flex-end"
            justifyContent="space-between"
            sx={{ position: 'relative', top: 47, pl: 3, pr: 1 }}
          >
            <UserAvatar size={140} border={3} />
            <Stack direction="row">
              <IconButton aria-label="edit">
                <EditIcon color="primary" />
              </IconButton>
              <IconButton aria-label="delete">
                <DeleteIcon color="error" />
              </IconButton>
            </Stack>
          </Stack>
        </Paper>
        <Stack
          direction="row"
          justifyContent="flex-start"
          sx={{ pl: 3, pr: 3, pb: 3 }}
        >
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
        </Stack>
      </Paper>
    </Container>
  )
}

export default Profile
