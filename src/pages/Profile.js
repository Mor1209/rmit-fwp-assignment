import React from 'react'
import { Container } from '@mui/system'
import {
  Typography,
  Paper,
  CssBaseline,
  Avatar,
  Stack,
  IconButton,
  Box,
} from '@mui/material'
import { useAuthContext } from '../hooks/useAuthContext'
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

const Profile = () => {
  const authCtx = useAuthContext()
  console.log(authCtx.user.name)

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
            mb: 14,
          }}
        >
          <Stack
            direction="row"
            justifyContent="space-between"
            alignItems="flex-start"
          >
            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              justifyContent="flex-start"
              sx={{ position: 'relative', top: 70, pl: 3 }}
            >
              <Avatar
                sx={{
                  width: 140,
                  height: 140,
                  border: 3,
                }}
              />
              <Typography textAlign={'left'} variant="h6" sx={{ pt: 8 }}>
                {name}
              </Typography>
            </Stack>
          </Stack>
        </Paper>
        <Stack>
          <Typography variant="body1" color="dimgray">
            {authCtx.user.email}
          </Typography>

          <Typography variant="body1" color="dimgray">
            Joined:{' '}
            {/* {new Intl.DateTimeFormat('EN-AU').format(authCtx.user.created)} */}
          </Typography>
        </Stack>
        <Stack
          direction="row"
          justifyContent="flex-end"
          sx={{ mb: 1, mr: 1, pt: 4 }}
        >
          <IconButton aria-label="edit">
            <EditIcon color="primary" />
          </IconButton>
          <IconButton aria-label="delete">
            <DeleteIcon color="error" />
          </IconButton>
        </Stack>
      </Paper>
    </Container>
  )
}

export default Profile
